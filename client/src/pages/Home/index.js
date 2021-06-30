import React, {useEffect, useState} from 'react';
import {Button, Container, Input} from "semantic-ui-react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import CustomSelect from "../../components/CustomSelect";
import {getAllSubjects} from "../../actions/subject";
import {getAllTests} from "../../actions/test";
import {startTesting} from "../../actions/testing";
import Preloader from "../../components/Preloader";
import {useHistory} from "react-router-dom";
import {TESTING_ROUTE} from "../../utils/routesConst";
import {setError} from "../../actions/error";

import "./styles.scss";

const Home = ({
    subjects,
    tests,
    getAllSubjects,
    getAllTests,
    startTesting,
    setError
}) => {
    const history = useHistory();
    const selectSubjectOptions = subjects.map(subject => ({ id: subject._id, text: subject.name}));
    const selectTestOptions = tests.map(test => ({ id: test._id, text: test.name, subjectId: test.subject }));

    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [subject, setSubject] = useState(null);
    const [test, setTest] = useState(null);

    const updateSubject = (value) => {
        setTest(null);
        setSubject(value);
    }

    const handleStart = () => {
        if (name.length < 10) {
            return setError('Name length must be more than 10 symbols!');
        }

        if (!subject) {
            return setError('You wasn\'t choose subject!');
        }

        if (!test) {
            return setError('You wasn\'t choose the test!');
        }

        startTesting({ name, subject, test })
            .then((res) => {
                console.log(res)
                if (res) {
                    history.push(TESTING_ROUTE + `/${res}`);
                }
            });
    }

    useEffect(() => {
        Promise.all([
            getAllSubjects(),
            getAllTests()
        ]).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Preloader />;
    }

    return (
        <div className="page">
            <Container className="Home">
                <div className="form">
                    <h2>Enter your data:</h2>
                    <Input
                        placeholder="Enter your full name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <CustomSelect
                        placeholder="Choose subject"
                        options={selectSubjectOptions}
                        returnValueFunc={updateSubject}
                    />
                    { subject &&
                    <CustomSelect
                        placeholder="Choose test"
                        options={selectTestOptions.filter(option => option.subjectId === subject)}
                        returnValueFunc={setTest}
                        defaultValue={test ? false : true}
                    />}
                    <Button onClick={() => handleStart()}>Start testing!</Button>
                </div>
            </Container>
        </div>
    );
};

const actions = { getAllSubjects, getAllTests, startTesting, setError };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = ({ subject, test }) => ({
   subjects: subject,
   tests: test,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
