import React from "react";
import CourseDetailsPage from "../../components/Course/CourseDetailsPage";


const Page = async ({ params }: any) => {
    const unwrappedParams = await params;
    return (
        <div className="">
            <CourseDetailsPage id={unwrappedParams.id} />
        </div>
    )
}

export default Page;
