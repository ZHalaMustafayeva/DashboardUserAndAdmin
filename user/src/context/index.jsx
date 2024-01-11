// Create a context
import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
    const [editBtn, setEditBtn] = useState(false)

    return (
        <DataContext.Provider value={{ editBtn, setEditBtn }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}
