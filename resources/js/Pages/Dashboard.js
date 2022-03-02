import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import {Head} from '@inertiajs/inertia-react';
import japanDate from "@/util/japanDate";
import getAges from "@/util/getAges";

export default function Dashboard(props) {
    const list = props.entities;

    function NoList(props) {
        const list = props.list;
        if (Array.isArray(list) && list.length === 0) {
            return (
                <div className="m-4 bg-white rounded drop-shadow p-4">
                    データがありません
                </div>
            )
        }
        return <></>
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Pickup"/>

            <div className="mx-auto max-w-md">
                {list.map((entity) => {
                    return (
                        <div key={'E' + entity.id} className="m-4 bg-neutral-200 rounded drop-shadow">
                            <h3 className="px-2 pt-1 pb-1 text-sm">{entity.name}</h3>
                            {entity.days.map((day) => {
                                return (
                                    <div key={'D' + day.id}
                                         className="bg-white p-2 bg-neutral-50 rounded border-b border-r border-l">
                                        <div>
                                            <span className="text-blue-600 font-bold">{day.name}</span>
                                            <span className="text-sm mx-2">まで</span>
                                            <span className="text-pink-600 font-bold">{day.diff_days}</span>
                                            <span className="text-sm ml-2">日</span>
                                        </div>
                                        <div className="mt-0">
                                            <span> {day.anniv_at}</span>
                                            <span>（{japanDate(day.anniv_at, true)}）</span>
                                            <span className="ml-1">{getAges(day.anniv_at)}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
                <NoList list={list}/>
            </div>
        </Authenticated>
    );
}
