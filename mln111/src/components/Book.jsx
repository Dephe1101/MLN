import React from 'react';
import { Page } from './Page';
import { bookData } from '../data/data';

export const Book = ({ currentPage }) => {
    return (
        <group position={[-2, 0, 0]}> {/* Giữ căn lề cho việc lật trang */}
            {bookData.map((page, index) => (
                <Page
                    key={page.id}
                    data={page}
                    index={index}
                    currentPage={currentPage}
                />
            ))}
        </group>
    );
};