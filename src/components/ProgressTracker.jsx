import React, { useState, useEffect } from 'react';

function ProgressTracker({ status }) {


    return (
        <div class="max-w-xl mx-auto my-4 border-b-2 pb-4">
            <div class="flex pb-3">
                <div class="flex-1">
                </div>

                <div class="flex-1">
                    <div class="w-10 h-10 bg-green-400 mx-auto rounded-full text-lg text-white flex items-center">
                        <span class="text-white text-center w-full">1</span>
                    </div>
                </div>


                <div class="w-1/6 align-center items-center align-middle content-center flex">
                    <div class="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
                        <div class="bg-green-400 text-xs leading-none py-1 text-center text-grey-darkest rounded " style={{ width: "100%" }}></div>
                    </div>
                </div>

                {(status == "PendingHOD" || status == "PendingCAO" || status == "Approved") ? <>

                    <div class="flex-1">
                        <div class="w-10 h-10 bg-green-400 mx-auto rounded-full text-lg text-white flex items-center">
                            <span class="text-white text-center w-full">2</span>
                        </div>
                    </div>

                    <div class="w-1/6 align-center items-center align-middle content-center flex">
                        <div class="w-full bg-green-400 rounded items-center align-middle align-center flex-1">
                            <div class="bg-green-400 text-xs leading-none py-1 text-center text-grey-darkest rounded " style={{ width: "20%" }}></div>
                        </div>
                    </div>
                </> :
                    <>

                        <div class="flex-1">
                            <div class="w-10 h-10 bg-gray-400 mx-auto rounded-full text-lg text-white flex items-center">
                                <span class="text-white text-center w-full">2</span>
                            </div>
                        </div>

                        <div class="w-1/6 align-center items-center align-middle content-center flex">
                            <div class="w-full bg-gray-400 rounded items-center align-middle align-center flex-1">
                                <div class="bg-gray-400 text-xs leading-none py-1 text-center text-grey-darkest rounded " style={{ width: "20%" }}></div>
                            </div>
                        </div>
                    </>
                }

                {(status == "PendingCAO" || status == "Approved") ? <>

                    <div class="flex-1">
                        <div class="w-10 h-10 bg-green-400 mx-auto rounded-full text-lg text-white flex items-center">
                            <span class="text-white text-center w-full">3</span>
                        </div>
                    </div>

                    <div class="w-1/6 align-center items-center align-middle content-center flex">
                        <div class="w-full bg-green-400 rounded items-center align-middle align-center flex-1">
                            <div class="bg-green-400 text-xs leading-none py-1 text-center text-grey-darkest rounded " style={{ width: "20%" }}></div>
                        </div>
                    </div>
                </> :
                    <>

                        <div class="flex-1">
                            <div class="w-10 h-10 bg-gray-400 mx-auto rounded-full text-lg text-white flex items-center">
                                <span class="text-white text-center w-full">3</span>
                            </div>
                        </div>

                        <div class="w-1/6 align-center items-center align-middle content-center flex">
                            <div class="w-full bg-gray-400 rounded items-center align-middle align-center flex-1">
                                <div class="bg-gray-400 text-xs leading-none py-1 text-center text-grey-darkest rounded " style={{ width: "20%" }}></div>
                            </div>
                        </div>
                    </>
                }


                {status == "Approved" ? <>

                    <div class="flex-1">
                        <div class="w-10 h-10 bg-green-400 mx-auto rounded-full text-lg text-white flex items-center">
                            <span class="text-white text-center w-full">4</span>
                        </div>
                    </div>                    
                </> :
                    <>
                        <div class="flex-1">
                            <div class="w-10 h-10 bg-gray-400 mx-auto rounded-full text-lg text-white flex items-center">
                                <span class="text-white text-center w-full">4</span>
                            </div>
                        </div>   
                    </>
                }


                <div class="flex-1">
                </div>
            </div>

            <div class="flex text-xs content-center text-center">
                <div class="w-1/4">
                    Head
                </div>

                <div class="w-1/4">
                    Event Coordinator
                </div>

                <div class="w-1/4">
                    HOD
                </div>

                <div class="w-1/4">
                    CAO
                </div>

            </div>
        </div>

    );
}

export default ProgressTracker;
