import React, { useState } from 'react';
import useFetch from '@hooks/useFetch';
import endPoints from '@services/api';
import Chart from '@common/Chart';

export default function Dashboard() {
    const totalProductsShown = 5;
    const [limit] = useState(totalProductsShown);
    const [offset, setOffset] = useState(0);

    let products = useFetch(endPoints.products.getProducts(limit, offset));

    const categories = products?.map((product) => product.category);
    const categoriesName = categories?.map((category) => category.name);

    const countOccurrences = (arr) => arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});

    const handlePaginationPrev = () => {
        if (offset <= 0) return;
        setOffset(offset - totalProductsShown);
    };
    const handlePaginationNext = () => {
        setOffset(offset + totalProductsShown);
    };

    const chartData = {
        datasets: [
            {
                label: 'Categories',
                data: countOccurrences(categoriesName),
                backgroundColor: ['#ffbb11', '#c0c0c0', '#50af95', '#f3ba2f', '#2a71d0'],
            },
        ],
    };

    return (
        <>
            <Chart chartData={chartData} />
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Image
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Id
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products?.map((product) => (
                                        <tr key={`Product-item-${product.id}`}>
                                            <td className="px-6 py-6 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-12 w-12">
                                                        <img className="h-12 w-12 rounded-full object-cover" src={product.images[0]} alt="" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{product.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{product.category.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">${product.price}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" aria-label="Pagination">
                <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{offset + 1}</span> to <span className="font-medium">{offset + totalProductsShown}</span>
                    </p>
                </div>
                <div className="flex-1 flex justify-between sm:justify-end">
                    <buttons onClick={handlePaginationPrev} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 cursor-pointer">
                        Previous
                    </buttons>
                    <buttons onClick={handlePaginationNext} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                        Next
                    </buttons>
                </div>
            </nav>
        </>
    );
}
