import {Text} from '@gravity-ui/uikit';

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
    console.log('✅ page')
    return (
        <Text color="primary">
            <span style={{ color: 'black'}}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis vero velit amet laudantium ipsam sapiente reiciendis maxime itaque aliquid laboriosam. Sit voluptates quidem doloremque eligendi rem quisquam iusto cumque odit tempora magnam labore voluptatem quam praesentium corporis explicabo animi quasi repudiandae, commodi deserunt sunt dolore pariatur. Quos ullam, eius earum nulla, dicta nesciunt mollitia veritatis consectetur impedit reiciendis pariatur esse ipsa dolor laborum voluptatum eos exercitationem ipsum reprehenderit modi similique expedita. Ipsa non reiciendis consequuntur, asperiores nisi sit corporis facere possimus iusto? Expedita incidunt voluptate veniam explicabo provident? Voluptatem, expedita asperiores? Qui provident dicta ipsum odio minus, accusamus impedit hic?
            </span>
        </Text>
    )
}
