import { storage } from "../../services/firebase";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Button, Upload, Progress, message, Image } from "antd";
import { UploadOutlined } from '@ant-design/icons';

const ImgUpload = () => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState('');

    const handleUpload = ({file}) => {
        setUploading(true);
        const storageRef = ref(storage, `profileImages/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progressValue = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progressValue);
        },
        (error) => {
            setUploading(false);
            setProgress(0);
            message.error(`Error uploading file ${error.message}`)
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref)
            .then((imgUrl) => {
                setUploading(false);
                setProgress(0);
                setUrl(imgUrl);
                message.success('Upload successful');
            })
        }
    )
    };

    return(
        <div>
            <Upload
            customRequest={handleUpload}
            showUploadList={false}
            >
                <Button icon={<UploadOutlined/>}>
                {uploading ? 'Uploading...' : 'Upload'}
                </Button>
            </Upload>
            {uploading && <Progress percent={progress}/>}
            {url && <div><Image width={100} src={url}/></div>}
        </div>
    )
};

export default ImgUpload;