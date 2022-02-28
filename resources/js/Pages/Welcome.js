import React from 'react';
import {Link, Head} from '@inertiajs/inertia-react';

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome"/>
            <div
                className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 items-center pt-0">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link href={route('dashboard')} className="text-sm text-gray-700 underline">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-sm text-gray-700 underline">
                                Log in
                            </Link>

                            <Link href={route('register')} className="ml-4 text-sm text-gray-700 underline">
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="max-w-6xl mx-auto px-8">
                    <div className="p-6 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                        <div className="text-center text-lg text-gray-900 dark:text-white">
                            ra
                        </div>
                        <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                            Recoding Anniversaries.
                        </div>
                    </div>

                    <div className="flex justify-end mt-4 sm:items-center sm:justify-end">
                        <div className="ml-4 text-right text-sm text-gray-500 sm:text-right sm:ml-0">
                            Laravel v{props.laravelVersion} (PHP v{props.phpVersion})
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
