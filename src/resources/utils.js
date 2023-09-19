export const validateFields = (query = [], body) => {
    return body ? Object.keys(body)?.filter(r => query.includes(r)).length < query.length : false;
};

export const onChangeBody = (e, body, setBody) => {
    const bodyCopy = {...body};

    if (e.text === "") {
        delete bodyCopy[e.name];
        setBody(bodyCopy);
        return;
    }
    if (e.isValid !== undefined) {
        if (e.isValid) {
            bodyCopy[e.name] = e.value;
        } else {
            delete bodyCopy[e.name];
        }
    } else {
        bodyCopy[e.name] = e.value;
    }
    setBody(bodyCopy);
};

export const onRequiredFieldNotAvailable = (
    formQuery, body,
    onSchedule
) => {
    let result = []
    for (let i = 0; i < formQuery.length; i++) {
        if (Object.keys(body).includes(formQuery[i])) continue
        if (onSchedule) {
            onSchedule(formQuery[i])
        } else {
            result.push(formQuery[i])
        }
    }
    if (!onSchedule) {
        return result;
    }
}
