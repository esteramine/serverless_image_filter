import axios from 'axios';
import React from 'react';

function Sidebar({ originalImage, setFilteredImage, selectedFilter, setSelectedFilter, setFilterLoading }) {
    const originalImageName = originalImage.split('/').pop();
    const filters = ['Original', 'Sharpen', 'Blur', 'Pencil Sketch', 'Sepia', 'Invert'];
    const styles = ['Candy', 'Composition', 'Feathers', 'La Muse', 'Mosaic', 'Starry Night', 'The Scream', 'The Wave', 'Undue'];

    const applyFilter = {
        'Original': () => {
            setFilteredImage(originalImage);
            setFilterLoading(false);
        },
        'Sharpen': async () => {
            axios
                .get('https://o3ce9nt019.execute-api.us-east-1.amazonaws.com/default/sharpenfilter?name=' + originalImageName)
                .then(res => {
                    setFilteredImage(res.data);
                    setFilterLoading(false);
                })
                .catch(err => console.log(err));
        },
        'Blur': async () => {
            axios
                .get('https://2cau2rbd1h.execute-api.us-east-1.amazonaws.com/default/blurfilter2?name=' + originalImageName)
                .then(res => {
                    setFilteredImage(res.data);
                    setFilterLoading(false);
                })
                .catch(err => console.log(err));
        },
        'Pencil Sketch': async () => {
            axios
                .get('https://2zoskv0sch.execute-api.us-east-1.amazonaws.com/default/pencilsketchfilter?name=' + originalImageName)
                .then(res => {
                    setFilteredImage(res.data);
                    setFilterLoading(false);
                })
                .catch(err => console.log(err));
        },
        'Sepia': async () => {
            axios
                .get('https://1bzw2rt9hi.execute-api.us-east-1.amazonaws.com/default/sepiafilter?name=' + originalImageName)
                .then(res => {
                    setFilteredImage(res.data);
                    setFilterLoading(false);
                })
                .catch(err => console.log(err));
        },
        'Invert': async () => {
            axios
                .get('https://1p4rjpgmj6.execute-api.us-east-1.amazonaws.com/default/invertfilter?name=' + originalImageName)
                .then(res => {
                    setFilteredImage(res.data);
                    setFilterLoading(false);
                })
                .catch(err => console.log(err));
        },
    }

    const applyStyle = async (styleName) => {
        const style = styleName.replace(' ', '_');
        console.log(style);
        // axios
        //     .get('https://1ub4gpl9ll.execute-api.us-east-1.amazonaws.com/default/StyleTransfer?name=' + originalImageName + '&style=' + style)
        //     .then(res => {
        //         setFilteredImage(res.data);
        //         setFilterLoading(false);
        //     })
        //     .catch(err => console.log(err));
    }

    return (
        <aside class="h-screen" aria-label="Sidebar">
            <div class="h-full overflow-y-auto py-4 px-3 bg-gray-50 dark:bg-gray-800">
                <ul class="space-y-2">
                    <h1 class='flex w-full items-center p-2 text-base text-gray-900 rounded-lg dark:text-white font-bold'>Filters</h1>
                    {filters.map(e => (
                        <li key={e}>
                            <button
                                onClick={() => {
                                    setSelectedFilter(e);
                                    applyFilter[e]();
                                    if (e !== 'Original') {
                                        setFilterLoading(true);
                                    }
                                }}
                                class={(selectedFilter === e ? 'bg-gray-700 ' : 'bg-transparent ') + "flex w-full items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}
                                disabled={originalImage === ''}
                            >
                                {/* <svg class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg> */}
                                <span class="ml-3 text-left">{e}</span>
                            </button>
                        </li>
                    ))}

                    {/* <li>
                        <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                            <span class="flex-1 ml-3 whitespace-nowrap">Filter B</span>
                            <span class="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                        </a>
                    </li> */}

                </ul>
                <ul class='pt-4 mt-4 space-y-2 border-gray-100 border-t-2 dark:border-gray-700'>
                    <h1 class='flex w-full items-center p-2 text-base text-gray-900 rounded-lg dark:text-white font-bold'>Style Transfer</h1>
                    {styles.map(e => (
                        <li key={e}>
                            <button
                                onClick={() => {
                                    setSelectedFilter(e);
                                    applyStyle(e);
                                    setFilterLoading(true);
                                }}
                                class={(selectedFilter === e ? 'bg-gray-700 ' : 'bg-transparent ') + "flex w-full items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}
                                disabled={originalImage === ''}
                            >
                                {/* <svg class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg> */}
                                <span class="ml-3">{e}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar