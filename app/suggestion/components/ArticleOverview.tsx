'use client';
import React from 'react';
import OverviewCard from './OverviewCard';

function ArticleOverview() {//TODO:to be developed
    return (
        <div className='z-0 flex flex-col relative bg-content1 overflow-auto rounded-large shadow-small w-full min-h-screen'>
            {[1, 2, 3, 4, 5].map((i) => (
                <OverviewCard key={i} />
            ))}
        </div>
    );
}

export default ArticleOverview;
