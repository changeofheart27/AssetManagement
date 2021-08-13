import React from 'react';

const DeleteFail = props => {
    let {id} =props
    return (
        <>
            <h3 className={"text-danger"}>Cannot delete asset</h3>
            <hr/>
            <p>Cannot delete the asset because it belongs to one or more historical assignments.
                If the asset is not able to be used anymore, please update its state in <a href={`/editasset/${id}`}> Edit Asset page</a></p>
        </>
    );
};

export default DeleteFail;