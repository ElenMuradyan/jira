import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Button, Upload, Progress, message, Image, notification } from "antd";
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { updateDoc, doc } from "firebase/firestore";
import { db, storage } from "../../../services/firebase";
import { useDispatch } from "react-redux";
import { setProfieImgUrl } from "../../../state-managment/slices/userProfile";
import { FIRESTORE_PATH_NAMES, STORAGE_PATH_NAMES } from "../../../core/utilis/constants";

const ImgUpload = () => {
    const { userData: { uid, imgUrl } } = useSelector(store => store.userProfile.authUserInfo);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const dispatch = useDispatch();

    const updateUserProfileImg = async (imgUrl) => {
        try{
            const userDocRef = doc ( db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
            await updateDoc(userDocRef, { imgUrl });
        }catch{
            notification.error({
                message:'Error:('
            })
        }
    }

    const handleUpload = ({file}) => {
        setUploading(true);
        const storageRef = ref(storage, `${STORAGE_PATH_NAMES.PROFILE_IMAGES}/${uid}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progressValue = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progressValue);
        },
        (error) => {
            setUploading(false);
            setProgress(0);
            message.error(`Error uploading file ${error.message}`);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref)
            .then((imgUrl) => {
                setUploading(false);
                setProgress(0);
                updateUserProfileImg(imgUrl);
                dispatch(setProfieImgUrl(imgUrl));
                message.success('Upload successful');
            })
        }
    )
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none'}} type="button">
            {uploading ? <Progress type="circle" percent={progress} size={70}/> : <PlusOutlined/>}
            <div style={{ marginTop: 8}}>Upload</div>
        </button>
    );

    return(
        <div>
            <Upload
            customRequest={handleUpload}
            showUploadList={false}
            listType="picture-card"
            >
                {imgUrl ? <Image width={100} src={imgUrl}/> : uploadButton}
            </Upload>
        </div>
    )
};

export default ImgUpload;