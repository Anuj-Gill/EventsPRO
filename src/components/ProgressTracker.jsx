import React, { useState, useEffect } from 'react';

function ProgressTracker({ status, prize }) {

    console.log(status, prize);
    const [isPrizeValid, setIsPrizeValid] = useState(false);

    useEffect(() => {
        const regex = /^[0-9]+$/;
        setIsPrizeValid(regex.test(prize));
    }, []);


    return (
        <div className="max-w-xl mx-auto my-4 border-b-2 pb-4">
            <div className="flex pb-3">
                <div className="flex-1">
                </div>

                <div className="flex-1">
                    <div className="w-10 h-10 bg-green-400 mx-auto rounded-full text-lg text-white flex items-center">
                        <span className="text-white text-center w-full">1</span>
                    </div>
                </div>


                <div className="w-1/6 align-center items-center align-middle content-center flex">
                    <div className="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
                        <div className="bg-green-400 text-xs leading-none py-1 text-center text-grey-darkest rounded " style={{ width: "100%" }}></div>
                    </div>
                </div>

                {(status == "PendingHOD" || status == "PendingCAO" || status == "Approved" || status == "PendingAccounts") ? <>

                    <div className="flex-1">
                        <div className="w-10 h-10 bg-green-400 mx-auto rounded-full text-lg text-white flex items-center">
                            <span className="text-white text-center w-full">2</span>
                        </div>
                    </div>

                    <div className="w-1/6 align-center items-center align-middle content-center flex">
                        <div className="w-full bg-green-400 rounded items-center align-middle align-center flex-1">
                            <div className="bg-green-400 text-xs leading-none py-1 text-center text-grey-darkest rounded " style={{ width: "20%" }}></div>
                        </div>
                    </div>
                </> :
                    <>

                        <div className="flex-1">
                            <div className="w-10 h-10 bg-gray-400 mx-auto rounded-full text-lg text-white flex items-center">
                                <span className="text-white text-center w-full">2</span>
                            </div>
                        </div>

                        <div className="w-1/6 align-center items-center align-middle content-center flex">
                            <div className="w-full bg-gray-400 rounded items-center align-middle align-center flex-1">
                                <div className="bg-gray-400 text-xs leading-none py-1 text-center text-grey-darkest rounded " style={{ width: "20%" }}></div>
                            </div>
                        </div>
                    </>
                }


                {(status == "PendingCAO" || status == "Approved" || status == "PendingAccounts") ? <>

                    <div className="flex-1">
                        <div className="w-10 h-10 bg-green-400 mx-auto rounded-full text-lg text-white flex items-center">
                            <span className="text-white text-center w-full">3</span>
                        </div>
                    </div>

                    <div className="w-1/6 align-center items-center align-middle content-center flex">
                        <div className="w-full bg-green-400 rounded items-center align-middle align-center flex-1">
                            <div className="bg-green-400 text-xs leading-none py-1 text-center text-grey-darkest rounded " style={{ width: "20%" }}></div>
                        </div>
                    </div>
                </> :
                    <>

                        <div className="flex-1">
                            <div className="w-10 h-10 bg-gray-400 mx-auto rounded-full text-lg text-white flex items-center">
                                <span className="text-white text-center w-full">3</span>
                            </div>
                        </div>

                        <div className="w-1/6 align-center items-center align-middle content-center flex">
                            <div className="w-full bg-gray-400 rounded items-center align-middle align-center flex-1">
                                <div className="bg-gray-400 text-xs leading-none py-1 text-center text-grey-darkest rounded " style={{ width: "20%" }}></div>
                            </div>
                        </div>
                    </>
                }
                {isPrizeValid &&
                    <>
                        {((status == "PendingCAO" || status == "Approved")) ? <>

                            <div className="flex-1">
                                <div className="w-10 h-10 bg-green-400 mx-auto rounded-full text-lg text-white flex items-center">
                                    <span className="text-white text-center w-full">4</span>
                                </div>
                            </div>

                            <div className="w-1/6 align-center items-center align-middle content-center flex">
                                <div className="w-full bg-green-400 rounded items-center align-middle align-center flex-1">
                                    <div className="bg-green-400 text-xs leading-none py-1 text-center text-grey-darkest rounded " style={{ width: "20%" }}></div>
                                </div>
                            </div>
                        </> :
                            <>

                                <div className="flex-1">
                                    <div className="w-10 h-10 bg-gray-400 mx-auto rounded-full text-lg text-white flex items-center">
                                        <span className="text-white text-center w-full">4</span>
                                    </div>
                                </div>

                                <div className="w-1/6 align-center items-center align-middle content-center flex">
                                    <div className="w-full bg-gray-400 rounded items-center align-middle align-center flex-1">
                                        <div className="bg-gray-400 text-xs leading-none py-1 text-center text-grey-darkest rounded " style={{ width: "20%" }}></div>
                                    </div>
                                </div>
                            </>
                        }
                    </>
                }

                {isPrizeValid ?
                    <>
                        {(status == "Approved") ? <>

                            <div className="flex-1">
                                <div className="w-10 h-10 bg-green-400 mx-auto rounded-full text-lg text-white flex items-center">
                                    <span className="text-white text-center w-full">5</span>
                                </div>
                            </div>
                        </> :
                            <>
                                <div className="flex-1">
                                    <div className="w-10 h-10 bg-gray-400 mx-auto rounded-full text-lg text-white flex items-center">
                                        <span className="text-white text-center w-full">5</span>
                                    </div>
                                </div>
                            </>
                        }
                    </>
                    :
                    <>
                        {(status == "Approved") ? <>

                            <div className="flex-1">
                                <div className="w-10 h-10 bg-green-400 mx-auto rounded-full text-lg text-white flex items-center">
                                    <span className="text-white text-center w-full">4</span>
                                </div>
                            </div>
                        </> :
                            <>
                                <div className="flex-1">
                                    <div className="w-10 h-10 bg-gray-400 mx-auto rounded-full text-lg text-white flex items-center">
                                        <span className="text-white text-center w-full">4</span>
                                    </div>
                                </div>
                            </>
                        }
                    </>

                }


                <div className="flex-1">
                </div>
            </div>

            {isPrizeValid ?

                <div className="flex text-xs content-center text-center -mr-24">
                    <div className="w-1/5 -ml-12">
                        Head
                    </div>
                    <div className="w-1/5 ">
                        Event Coordinator
                    </div>
                    <div className="w-1/5">
                        HOD
                    </div>
                    <div className="w-1/5">
                        Accounts
                    </div>

                    <div className="w-1/5">
                        CAO
                    </div>

                </div>
                :

                <div className="flex text-xs content-center text-center">
                    <div className="w-1/4">
                        Head
                    </div>

                    <div className="w-1/4">
                        Event Coordinator
                    </div>

                    <div className="w-1/4">
                        HOD
                    </div>



                    <div className="w-1/4">
                        CAO
                    </div>

                </div>
            }

        </div>

    );
}

export default ProgressTracker;
