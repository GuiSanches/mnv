import { FC, useEffect, useMemo, useState } from "react";
import { ClipLoader } from "react-spinners";
import { css } from "styled-components";
import { FormControl, InputGroup, InputGroupPrepend, InputGroupText } from "../../../../../styles/global";
import { Compute } from "./styles";

interface Props {
    total?: number;
    title: string;
    onCompute: () => void;
}

const ComputeElement: FC<Props> = ({ total, title, onCompute }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const handleClick = () => {
        setLoading(true);
        onCompute();
    }

    useEffect(() => {
        if (total) setLoading(false)
    }, [total])

    return (
        <InputGroup>
            <InputGroupPrepend>
                <InputGroupText className="span-175">{title}</InputGroupText>
            </InputGroupPrepend>
            <FormControl type="text" disabled value={total} />
            <Compute onClick={() => handleClick()}>
                <ClipLoader color={'#ffffff'} loading={loading}
                    css={'border: red'}
                    size={15} />
                Compute
            </Compute>
        </InputGroup>
    )
}

export default ComputeElement;