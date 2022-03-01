import React, {useEffect} from 'react';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Authenticated from '@/Layouts/Authenticated';
import ValidationErrors from '@/Components/ValidationErrors';
import {Head, Link, useForm} from '@inertiajs/inertia-react';


export default function Entity(props) {
    const dayData = props.dayData
    const entityData = props.entityData
    const status = props.status
    const {data, setData, post, processing, errors, put} = useForm({
        id: dayData ? dayData.id : undefined,
        name: dayData ? dayData.name : undefined,
        desc: dayData ? dayData.desc : undefined,
        anniv_at: dayData ? dayData.anniv_at : undefined,
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        if (dayData && dayData.id) {
            put(route('entities.days.update', {entity: entityData.id, day: dayData.id}))
        } else {
            post(route('entities.days.store', {entity: entityData.id}));
        }
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title={(dayData ? 'Update' : 'Create') + ' Day'}/>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg mx-auto">

                <h2 className="mb-2">{dayData ? 'Update' : 'Create'} Day</h2>

                <h3 className="mb-2">{entityData.name}</h3>

                <ValidationErrors errors={errors}/>

                <form onSubmit={submit}>
                    <div>
                        <Label forInput="name" value="名前"/>

                        <Input
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            isFocused={true}
                            handleChange={onHandleChange}
                        />
                    </div>

                    <div>
                        <Label forInput="desc" value="説明"/>

                        <Input
                            type="text"
                            name="desc"
                            value={data.desc}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button className="ml-4" processing={processing}>
                            {dayData ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
