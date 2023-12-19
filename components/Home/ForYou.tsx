'use client';
import React from 'react';
import { ArtificialIcon, EasyIcon, MultiIcon, PrivacyIcone } from '../Icon/AcmeLogo';

function ForYou() {
    const ArtiText =
        'Provide multiple ML models to respond to user diagnosis consultations and continuously update new models. LLM functionality will also be introduced in the future to address a wider range of diagnostic functions.';

    const MultiText =
        'Currently provides multiple diseases such as acute urinary system inflammation, heart disease, Parkinson s disease, breast cancer, primary tumors, liver disease, chronic kidney disease, and multiple models such as Decision tree, K-Means, Linear regression, XGBoost for diagnosis.';

    const EasyText =
        'Select the disease to be diagnosed, enter the current symptoms, and predict the disease and provide medical advice. The model selection provides default options to facilitate users who do not understand model details to use.';

    return (
        <div>
            <h2 className='text-[2.5rem] text-center m-[2rem] font'>What can we do for you？</h2>
            <p className='px-[10rem] text-[1.4rem] '>
                <span className='mr-[0.4rem]'>Medical-ZKML</span>
                <span className='font-extralight text-[#343531]'>
                    is an assisted diagnosis and treatment system that can provide diagnosis and treatment suggestions for the symptoms described while protecting your privacy. Its
                    underlying technology uses multiple models to assist in prediction and is developed using zero-knowledge proof language to achieve the goal of privacy
                    prediction.
                </span>
            </p>
            <h2 className='text-[2.5rem] text-center m-[2rem] font'>Features</h2>
            <div className='flex justify-evenly px-[.2rem]'>
                <div className='w-[20rem]'>
                    <h4 className='iconText flex gap-2 items-end'>
                        <PrivacyIcone />
                        Privacy Protection
                    </h4>
                    <p className='whitespace-pre-line'>
                        Use zero-knowledge proof language to protect user input data. Only the user is aware of the input content and provides Proof for the user to verify.
                    </p>
                </div>
                <div className='w-[20rem]'>
                    <h4 className='iconText flex gap-2 items-end'>
                        <ArtificialIcon />
                        Artificial Intelligence
                    </h4>
                    <p>{ArtiText}</p>
                </div>
                <div className='w-[22rem]'>
                    <h4 className='iconText flex gap-2 items-end'>
                        <MultiIcon />
                        Multi-Disease Multi-Model
                    </h4>
                    <p>{MultiText}</p>
                </div>
                <div className='w-[20rem]'>
                    <h4 className='iconText flex gap-2 items-end'>
                        <EasyIcon />
                        Easy to use
                    </h4>
                    <p>{EasyText}</p>
                </div>
            </div>
        </div>
    );
}

export default ForYou;
