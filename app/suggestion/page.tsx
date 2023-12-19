'use client';
import React, { useCallback, useEffect } from 'react';
import '@/components/index.css';
import ArticleList from './components/ArticleList';
import { postRecommend } from '@/utils/request';

function Page() {
    const fetchData = useCallback(async () => {
        try {
            const recommend = await postRecommend({ disease: 'Primary_Tumor' });

            if (recommend.data) {
            }
        } catch (error) {}
    }, []);

    useEffect(() => {
        // fetchData();
    }, [fetchData]);

    return (
        <div className='p-[6rem] pt-[2rem] flex '>
            <div className=''>
                <ArticleList />
            </div>
            {/* //Hidden favourites */}
            {/* <div className='border-r-[1px] border-[#f2f2f2] min-h-screen mx-[2rem]'></div> */}
            {/* <div>
                {[1, 2.3].map((i) => (
                    <div key={i} className='mb-[1rem]'>
                        <h2 className='font-semibold mb-[1rem]'>Staff Picks</h2>
                        <User
                            name='Jane Doe · 2012-5-12'
                            avatarProps={{
                                src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
                                className: 'w-6 h-6 text-tiny',
                            }}
                        />
                        <Link href={'/suggestion/123'}>
                            <h2 className='font-semibold containerText'>When I Went Underground</h2>{' '}
                        </Link>
                    </div>
                ))}
            </div> */}
        </div>
    );
}

export default Page;
