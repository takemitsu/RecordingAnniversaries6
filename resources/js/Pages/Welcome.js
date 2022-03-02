import React from 'react';
import {Link, Head} from '@inertiajs/inertia-react';

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome"/>
            <div
                className="relative flex items-top justify-center min-h-screen bg-neutral-200 items-center pt-0">
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
                    <div className="p-6 bg-white overflow-hidden shadow rounded-lg">
                        <div className="text-center text-lg text-gray-600">
                            ra
                        </div>
                        <div className="mt-1 text-gray-400 text-sm text-center">
                            Recoding Anniversaries.
                        </div>
                        <div className="mt-4 text-gray-300 text-xs text-left">
                            記念日の記録をデバイスに囚われずに保存
                        </div>
                    </div>

                    <div className="flex justify-end mt-4 sm:items-center sm:justify-end">
                        <div className="ml-4 text-right text-sm text-gray-500 sm:text-right sm:ml-0">
                            <a href='https://laravel.com/' className="underline pr-1">
                                Laravel
                            </a>
                            v{props.laravelVersion} (PHP v{props.phpVersion})
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
