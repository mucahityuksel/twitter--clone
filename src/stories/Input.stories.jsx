import React from "react";
import { Input } from "./Input";

export default{
    title : "Example/Input",
    component : Input,
}

const Template = (args) => <Input {...args}></Input>;

export const Username = Template.bind({});
Username.args = {
    value : "form",
    type : "text",
    name : "username",
    onChange : (e)=>{
        console.log(e.target.value)
    }
}

export const Date = Template.bind({});
Date.args = {
    value : "form",
    type : "date",
    name : "Birth Date"
}

export const Password = Template.bind({});
Password.args = {
    value : "form",
    type : "password",
    name : "Password"
}

export const Email = Template.bind({});
Email.args = {
    value : "form",
    type : "email",
    name : "Email"
}