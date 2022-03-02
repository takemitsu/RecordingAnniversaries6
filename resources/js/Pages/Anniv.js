import React, {useState} from 'react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Authenticated from '@/Layouts/Authenticated';
import ValidationErrors from '@/Components/ValidationErrors';
import {Head, Link, useForm} from '@inertiajs/inertia-react';
import Textarea from "@/Components/Textarea";
import dayjs from "dayjs";
import DatePicker, {registerLocale} from 'react-datepicker'
import ja from 'date-fns/locale/ja'

dayjs.locale('ja')
registerLocale('ja', ja)


export default function Entity(props) {
    const dayData = props.dayData
    const entityData = props.entityData
    const status = props.status
    const {data, setData, post, processing, errors, put} = useForm({
        id: dayData ? dayData.id : undefined,
        name: dayData ? dayData.name : "",
        desc: dayData ? (dayData.desc ?? undefined) : undefined,
        anniv_at: dayData ? dayData.anniv_at : dayjs().format('YYYY-MM-DD'),
    });

    const setTimeZero = (date) => {
        return dayjs(date).hour(0).minute(0).second(0).millisecond(0).toDate()
    }
    const [selectDate, setSelectDate] = useState(dayData ? setTimeZero(dayData.anniv_at) : setTimeZero(new Date()))

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };
    const onHandleChangeAnnivAt = async (date) => {
        await setSelectDate(date)
        // console.log(date, typeof date, date instanceof Date)
        await setData('anniv_at', dayjs(date).format('YYYY-MM-DD'))
        // console.log(data.anniv_at)
    }

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

                <h2 className="mb-4 border-b">{dayData ? 'Update' : 'Create'} Anniversary Day</h2>

                <h3 className="mb-2">{entityData.name}</h3>

                <ValidationErrors errors={errors}/>

                <form onSubmit={submit}>
                    <div>
                        <Label forInput="name" value="day name"/>

                        <Input
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            isFocused={true}
                            handleChange={onHandleChange}
                            required={true}
                        />
                    </div>

                    <div>
                        <Label value="anniversary day"/>
                        <DatePicker
                            selected={selectDate}
                            onChange={onHandleChangeAnnivAt}
                            locale="ja"
                            popperClassName="d-none"
                            dateFormat="yyyy-MM-dd"
                            className="rounded"
                        />
                        <DatePicker
                            selected={selectDate}
                            onChange={onHandleChangeAnnivAt}
                            locale="ja"
                            inline
                            dateFormat="yyyy-MM-dd"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            todayButton="Today"
                        />
                    </div>

                    <div>
                        <Label forInput="desc" value="description"/>

                        <Textarea
                            name="desc"
                            value={data.desc}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                        />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <Link
                            href={route('entities.index')}
                            method="get"
                            as="button"
                            className="underline"
                        >
                            Back to List
                        </Link>

                        <Button className="ml-4" processing={processing}>
                            {dayData ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
