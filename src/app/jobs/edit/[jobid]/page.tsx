'use client'
import JobPostForm from '@/components/JobPostForm'
import PageTitle from '@/components/PageTitle'
import { Button, Form, message } from 'antd'
import { useRouter, useParams } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'
import axios from "axios"
import { SetLoading } from '@/redux/loadersSlice'

function EditJob() {
    const [jobData, setJobData] = React.useState<any>(null);
    const router = useRouter();
    const { jobid } = useParams();

    const dispatch = useDispatch();

    const onFinish = async (values: any) => {
        try {
            values._id = jobid;
            dispatch(SetLoading(true));
            const response = await axios.put(`/api/jobs/${jobid}`, values);
            message.success(response.data.message);
            router.push("/jobs");
        } catch (error: any) {
            message.error(error.message);
        } finally {
            dispatch(SetLoading(false));
        }
    };

    const fetchJob = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await axios.get(`/api/jobs/${jobid}`);
            setJobData(response.data.data);
        } catch (error: any) {
            message.error(error.message);
        } finally {
            dispatch(SetLoading(false));
        }
    };

    React.useEffect(() => {
        fetchJob();
    }, []);

    return (
        jobData && <div>
            <div className="flex justify-between items-center">
                <PageTitle title="Edit Job Post" />
                <div className="flex justify-end items-center gap-3 my-3">
                    <Button type="default" onClick={() => router.back()}>
                        Back
                    </Button>
                </div>
            </div>

            <Form layout="vertical"
                onFinish={onFinish}
                // La información se trae de la base de datos y se muestra en el formulario
                initialValues={jobData}
            >
                <JobPostForm />

                <div className="flex justify-end items-center gap-3 my-3">
                    <Button type="default" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Update Job
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default EditJob