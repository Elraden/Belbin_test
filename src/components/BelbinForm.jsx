import { useState } from 'react';
import { Container, Button, Typography } from '@mui/material';
import QuestionSection from './QuestionSection';
import UserInfoForm from './UserInfoForm';
import Instruction from './Instruction';
import TestResults from './TestResults';
import belbinQuestions from '../questions.json';
import belbinKey from '../belbin_key.json';

const BelbinForm = () => {
    const [formData, setFormData] = useState({});
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [isTestComplete, setIsTestComplete] = useState(false);
    const [isInfoFilled, setIsInfoFilled] = useState(false);
    const [isInstructionShown, setIsInstructionShown] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [teamName, setTeamName] = useState('');
    const [inTeam, setInTeam] = useState(false);
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [totalPoints, setTotalPoints] = useState(0);

    const sections = Object.keys(belbinQuestions);
    const currentSection = belbinQuestions[sections[currentSectionIndex]];

    const onEmailChange = (value) => {
        setEmail(value); 
    };

    const onRoleChange = (value) => {
        setRole(value); 
    };



    const handleSubmit = () => {
        const total = Object.values(formData[sections[currentSectionIndex]] || {}).reduce((sum, val) => sum + val, 0);
        if (total !== 10) {
            setError('Сумма баллов должна быть равна 10');
            return;
        }

        const filledFormData = { ...formData };
        sections.forEach((section) => {
            if (!filledFormData[section]) {
                filledFormData[section] = {};
            }
            belbinQuestions[section].statements.forEach((_, index) => {
                if (filledFormData[section][index] === undefined) {
                    filledFormData[section][index] = 0;
                }
            });
        });

        const roleScores = {};
        sections.forEach((sectionKey) => {
            const sectionData = filledFormData[sectionKey];
            const sectionKeyData = belbinKey[sectionKey];

            if (sectionKeyData) {
                const roles = sectionKeyData.roles;
                Object.keys(sectionData).forEach((questionIndex) => {
                    const answerValue = sectionData[questionIndex];
                    const role = roles[questionIndex];

                    if (!roleScores[role]) {
                        roleScores[role] = 0;
                    }
                    roleScores[role] += answerValue;
                });
            }
        });

        const sortedRoles = Object.entries(roleScores).sort(([, scoreA], [, scoreB]) => scoreB - scoreA);
        const interpretationJson = sortedRoles.map(([role, score]) => ({
            name: role,
            score
        }));

        const apiUrl = import.meta.env.VITE_API_URL;
        const testData = { name, email, role, inTeam, teamName, results: filledFormData, interpretation: interpretationJson };


        console.log(testData);

        fetch(`${apiUrl}/api/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData),
        })
            .then((response) => response.json())
            .then((data) => {
                setResults(sortedRoles);
                setIsTestComplete(true);
            })
            .catch((error) => console.error('Error:', error));
    };

    const handleNextSection = () => {
        const total = Object.values(formData[sections[currentSectionIndex]] || {}).reduce((sum, val) => sum + val, 0);
        if (total !== 10) {
            setError('Сумма баллов должна быть равна 10');
        } else {
            setError('');
            setCurrentSectionIndex(currentSectionIndex + 1);
            setTotalPoints(0);
        }
    };

    const handleUserInfoNext = () => {
        setIsInfoFilled(true);
    };

    const handleAnswerChange = (index, value) => {
        const updatedAnswers = {
            ...formData,
            [sections[currentSectionIndex]]: {
                ...formData[sections[currentSectionIndex]],
                [index]: value,
            },
        };
        setFormData(updatedAnswers);

        const total = Object.values(updatedAnswers[sections[currentSectionIndex]] || {}).reduce((sum, val) => sum + val, 0);
        setTotalPoints(total);
    };

    if (isTestComplete) {
        return <TestResults results={results} />;
    }

    if (!isInfoFilled) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
                <UserInfoForm
                    name={name}
                    email={email}
                    role={role}
                    teamName={teamName}
                    inTeam={inTeam}
                    onNameChange={(e) => setName(e.target.value)}
                    onEmailChange={onEmailChange} 
                    onRoleChange={onRoleChange} 
                    onTeamChange={(e) => setTeamName(e.target.value)}
                    onInTeamChange={(e) => setInTeam(e.target.checked)}
                    onNext={handleUserInfoNext}
                />
            </Container>
        );
    }

    if (!isInstructionShown) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
                <Instruction onNext={() => setIsInstructionShown(true)} />
            </Container>
        );
    }

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
            <Typography variant="h4">Секция {currentSectionIndex + 1}</Typography>
            <QuestionSection
                sectionData={currentSection}
                answers={formData[sections[currentSectionIndex]] || {}}
                onAnswerChange={handleAnswerChange}
            />
            <Typography variant="h6">Сумма баллов за этот раздел: {totalPoints}</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <div>
                {currentSectionIndex > 0 && (
                    <Button variant="contained" onClick={() => setCurrentSectionIndex(currentSectionIndex - 1)}>
                        Назад
                    </Button>
                )}
                {currentSectionIndex < sections.length - 1 && (
                    <Button variant="contained" color="primary" onClick={handleNextSection}>
                        Далее
                    </Button>
                )}
                {currentSectionIndex === sections.length - 1 && (
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Закончить тест
                    </Button>
                )}
            </div>
        </Container>
    );
};

export default BelbinForm;