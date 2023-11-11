import React, { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";

import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
    const [article, setArticle] = useState({
        url: '',
        summary: ''
    });

    const [allArticles, setAllArticles] = useState([]);

    const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const {data} = await getSummary({articleUrl: article.url});

        if(data?.summary){
            const newArticle = {
                ...article,
                summary: data.summary
            }

            setArticle(newArticle);
            console.log(newArticle);
        }
    }
    return (
        <section className="mt-16 w-full max-w-xl">
            {/* Search */}
            <div className="flex flex-col w-full gap-2">
                <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
                    <img 
                        src={linkIcon} 
                        alt="link_icon" 
                        className="absolute left-0 my-2 ml-3 w-5" 
                    />

                    <input 
                        type="url" 
                        placeholder="Enter a URL" 
                        className="url_input peer" 
                        value={article.url} 
                        onChange={(e)=> setArticle({
                            ...article,
                            url: e.target.value
                        })} 
                        required
                    />

                    <button
                        type='submit'
                        className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 '
                    >
                        <p>↵</p>
                    </button>
                </form>

                {/* Browse History */}
                <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
                    {allArticles.reverse().map((item, index) => (
                        <div
                            key={`link-${index}`}
                            onClick={() => setArticle(item)}
                            className='link_card'
                        >
                            <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                                <img
                                    src={copied === item.url ? tick : copy}
                                    alt={copied === item.url ? "tick_icon" : "copy_icon"}
                                    className='w-[40%] h-[40%] object-contain'
                                />
                            </div>
                            <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                                {item.url}
                            </p>
                        </div>
                    ))}
                </div>

            </div>

            {/* Display Result */}
        </section>
    )
}

export default Demo