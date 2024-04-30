import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        //now if the user want to it the post then fist check for the default values if present 
        //if not present then we put the empty string in it 
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    //Taaking the user data using the use selector function to get the data from the state 
    const userData = useSelector((state) => state.auth.userData);
    //Now we have to do two things now if the data is present then update and if the 
    //the data is not present then just add it to the state
    const submit = async (data) => {
        //checking if the post is intially present 
        if (post) {
            //managing the file by uploading
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            //and deleting the file if it exists previously 
            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });
//Now if we update all the data then we need to redirect to the edited post by using its id  
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
        //If the post is not intially present then we need to add it to the state 
        else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                data.userid = userData.$id;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id});

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };
//Now converting the slug into the URL format 
    const slugTransform = useCallback((value) => {
        //and for conversion we first check that the value is a string
        if (value && typeof value === "string")
            return value
        //then we trim it and convert it to lowercase 
                .trim()
                .toLowerCase()
        //then we use the regex to keep all letters a-z A-Z and digits and 
        //other than these will get converted to "-"
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
