import { type FC } from 'react';
import { PopulateSetsForm } from './PopulateSetsForm';

export const SuperAdmin: FC = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Super Admin Panel</h1>
            <PopulateSetsForm />
        </div>
    )
}
