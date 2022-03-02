import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import {Head, Link,} from '@inertiajs/inertia-react';
import japanDate from "@/util/japanDate";
import getAges from "@/util/getAges";
import TextButton from "@/Components/TextButton";
import {Inertia} from "@inertiajs/inertia";

export default function Entities(props) {
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

    function handleRemoveEntity(entity) {
        if (confirm('remove this entity: ' + entity.name)) {
            Inertia.delete(route('entities.destroy', {entity: entity.id}))
        }
    }

    function handleRemoveDay(entity, day) {
        if (confirm('remove this day: ' + day.name)) {
            Inertia.delete(route('entities.days.destroy', {entity: entity.id, day: day.id}))
        }
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Pickup"/>

            <div className="mx-auto max-w-md">
                <div className="flex justify-between mx-4 mt-2">
                    <h2>Anniversary List</h2>

                    <Link
                        href={route('entities.create')}
                        method="get"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900"
                    >
                        Add Group
                    </Link>
                </div>

                {list.map((entity) => {
                    return (
                        <div key={'E' + entity.id} className="m-4 bg-neutral-200 rounded drop-shadow">
                            <div className="px-2 pt-1 pb-1">
                                <div className="font-bold text-sm">
                                    <div className="flex items-center">
                                        <span className="flex-1">{entity.name}</span>

                                        <TextButton type="button" className="bg-neutral-200 text-orange-500"
                                                    handleClick={() => handleRemoveEntity(entity)}>
                                            Remove
                                        </TextButton>

                                        <Link
                                            href={route('entities.edit', {entity: entity.id})}
                                            method="get"
                                            as="button"
                                            className="underline text-sm text-sky-600 hover:text-sky-900"
                                        >
                                            Edit
                                        </Link>

                                        <Link
                                            href={route('entities.days.create', {entity: entity.id})}
                                            method="get"
                                            as="button"
                                            className="underline text-sm text-gray-600 hover:text-gray-900 ml-2"
                                        >
                                            Add Day
                                        </Link>
                                    </div>
                                </div>
                                {entity.desc && (
                                    <div className="text-xs mt-1 whitespace-pre-line">{entity.desc}</div>
                                )}

                            </div>
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

                                        {day.desc && (
                                            <div className="text-xs mt-1 whitespace-pre-line">{day.desc}</div>
                                        )}

                                        <div className="mt-1">
                                            <span> {day.anniv_at}</span>
                                            <span>（{japanDate(day.anniv_at, true)}）</span>
                                            <span className="ml-1">{getAges(day.anniv_at)}</span>
                                        </div>
                                        <div className="text-right">
                                            <TextButton type="button" className="text-orange-500 bg-neutral-50"
                                                        handleClick={() => handleRemoveDay(entity, day)}>
                                                Remove
                                            </TextButton>

                                            <Link
                                                href={route('entities.days.edit', {entity: entity.id, day: day.id})}
                                                method="get"
                                                as="button"
                                                className="underline text-sm text-sky-600 hover:text-sky-900 ml-2"
                                            >
                                                Edit
                                            </Link>
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
