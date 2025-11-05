'use server';

import { prisma } from '@/shared/prisma';

interface ScryfallSet {
  code: string;
  name: string;
  icon_svg_uri: string;
  parent_set_code?: string;
}

export async function populateSetsAction() {
  try {
    console.log('📥 Fetching Magic: The Gathering sets from Scryfall API...');
    
    // Делаем запрос к API Scryfall для получения всех сетов
    const response = await fetch('https://api.scryfall.com/sets');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sets: ${response.status} ${response.statusText}`);
    }
    
    const jsonData = await response.json();
    const sets: ScryfallSet[] = jsonData.data;
    
    console.log(`📊 Found ${sets.length} sets in Scryfall API`);
    
    // Разбиваем на чанки по 100 записей
    const chunkSize = 100;
    let processedCount = 0;
    let skippedCount = 0;
    
    console.log('📤 Starting to populate database with sets...');
    
    for (let i = 0; i < sets.length; i += chunkSize) {
      const chunk = sets.slice(i, i + chunkSize);
      
      // Проверяем, какие сеты уже существуют в БД
      const existingCodes = new Set(
        (await prisma.set.findMany({
          where: {
            code: {
              in: chunk.map(set => set.code)
            }
          },
          select: {
            code: true
          }
        })).map(set => set.code)
      );
      
      // Фильтруем только новые сеты
      const newSets = chunk.filter(set => !existingCodes.has(set.code));
      
      if (newSets.length > 0) {
        // Создаем новые записи в БД параллельно
        await Promise.all(
          newSets.map(set => 
            prisma.set.create({
              data: {
                code: set.code,
                name: set.name,
                iconSvgUri: set.icon_svg_uri,
                parentSetCode: set.parent_set_code || null
              }
            })
          )
        );
        
        console.log(`✅ Processed chunk ${Math.floor(i/chunkSize) + 1}/${Math.ceil(sets.length/chunkSize)}: ${newSets.length} new sets added`);
        processedCount += newSets.length;
      } else {
        console.log(`⏭️  Processed chunk ${Math.floor(i/chunkSize) + 1}/${Math.ceil(sets.length/chunkSize)}: all sets already exist, skipping`);
      }
      
      skippedCount += chunk.length - newSets.length;
    }
    
    console.log(`🎉 Finished populating sets:
       - ${processedCount} new sets added
       - ${skippedCount} sets already existed
       - Total: ${sets.length} sets processed`);
       
    return {
      success: true,
      message: `Successfully populated ${processedCount} new sets, ${skippedCount} already existed`,
      processedCount,
      skippedCount,
      totalCount: sets.length
    };
  } catch (error) {
    console.error('❌ Error populating MTG sets:', error);
    return {
      success: false,
      message: `Error populating MTG sets: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}
