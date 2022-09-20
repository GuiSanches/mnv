import { FC } from "react";
import { FormControl, InputGroup, InputGroupPrepend, InputGroupText } from "../../../../../styles/global";

interface Props {
    total?: number;
    title: string;
}

const ComputedElement: FC<Props> = ({ total, title }) => {

    return (
        <InputGroup>
            <InputGroupPrepend>
                <InputGroupText className="span-175">{title}</InputGroupText>
            </InputGroupPrepend>
            <FormControl type="text" disabled value={total || ''} />
        </InputGroup>
    )
}

export default ComputedElement;