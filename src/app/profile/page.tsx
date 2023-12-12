"use client";

import EmployeeForm from "@/components/EmployeeForm";
import EmployerForm from "@/components/EmployerForm";
import React from "react";
import { Button, Form, message } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "@/components/PageTitle";
import { SetCurrentUser } from "@/redux/usersSlice";
import { SetLoading } from "@/redux/loadersSlice";

function Profile() {
    const { currentUser } = useSelector((state: any) => state.users);
    const dispatch = useDispatch();

    const onFinish = async (values: any) => {
        try {
            values._id = currentUser._id;
            values.userType = currentUser.userType;
            dispatch(SetLoading(true));
            const response = await axios.put("/api/users", values);
            message.success("Profile updated successfully");
            dispatch(SetCurrentUser(response.data.data));
        } catch (error: any) {
            message.error(error.response.data.message || "Something went wrong");
        } finally {
            dispatch(SetLoading(false));
        }
    };

    return (
        <div>
            <PageTitle title="Profile" />
            <Form layout="vertical"
                initialValues={currentUser} onFinish={onFinish}
            >
                {currentUser?.userType === 'employer' ? (
                    <EmployerForm />
                ) : (
                    <EmployeeForm />
                )}

                {/* submit button */}
                <div className="flex justify-end my-3">
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default Profile;