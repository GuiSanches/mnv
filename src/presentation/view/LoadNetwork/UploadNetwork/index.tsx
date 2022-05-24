import { ChangeEvent, FC, MouseEvent, useState } from "react";
import { Button, Label, Line } from "../../../../../styles/global";
import { NetworkContainer } from "../../../../adapter/mnvLoadNet/types";
import { Container, CustomFile, Input, CustomFileLabel, Wrapper } from "./styles";

interface Props {
    onUploadJsonFile: (e: NetworkContainer) => void;
}

const UploadJsonNetwork: FC<Props> = ({ onUploadJsonFile }) => {
    const title = `Import a '.json' network file`;
    const placeholder = `Select a '.json' file`;
    const [fileSelected, setFileSelected] = useState<File>()

    const handleUpload = (e: MouseEvent<HTMLButtonElement>) => {
        if (fileSelected) {
            const formData = new FormData();
            formData.append('network', fileSelected, fileSelected.name);
            console.log(formData.getAll('network')[0]);
            console.log(fileSelected.name)

            const fileReader = new FileReader();
            fileReader.readAsText(fileSelected, "UTF-8");
            fileReader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target) {
                    const uploadedJSon : NetworkContainer = JSON.parse(e.target.result as string);
                    onUploadJsonFile(uploadedJSon);
                }
            }
        }
    }

    const handleBrowse = (e: ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;

        if (!fileList) return;
        setFileSelected(fileList[0]);
    }

    return (
        <Container>
            <Label>{title}</Label>
            <Line />
            <Wrapper>
                <CustomFile>
                    <Input type="file" onChange={handleBrowse} placeholder={placeholder} />
                    <CustomFileLabel>
                        {fileSelected ? fileSelected.name : placeholder}
                    </CustomFileLabel>
                </CustomFile>
                <Button onClick={handleUpload}>Upload</Button>
            </Wrapper>
        </Container>
    )

}

export default UploadJsonNetwork;