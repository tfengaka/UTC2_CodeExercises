import MonacoEditor, { useMonaco } from '@monaco-editor/react';
import Discuss from 'features/exercise/Discuss';
import { CodeType, useCompiler } from 'hooks/useCompiler';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from './Button';
import Dropdown from './Dropdown';
import Helmet from './Helmet';
import MDView from './MarkDownEdior/MDView';
const languageOptions = {
  C: {
    id: 75,
    value: 'c',
  },
  CPP: {
    id: 76,
    value: 'cpp',
  },
  CSharp: {
    id: 17,
    value: 'csharp',
  },
  Java: {
    id: 62,
    value: 'java',
  },
  JavaScript: {
    id: 63,
    value: 'javascript',
  },
};

const ProblemSolve = ({
  isContest,
  exerciseContest,
  currentExercise,
  sourceCodeOfContest,
  setSourceCodeOfContest,
  setResultDataContest,
  resultDataContest,
}) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  let { data } = location.state;
  data = isContest ? exerciseContest : data;

  const { loading, language, setLanguage, runCode } = useCompiler(data.metadata);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState(0);
  const [currentCase, setCurrentCase] = React.useState(0);
  const [showDiscuss, setShowDiscuss] = React.useState(false);
  const [sourceCodeExercise, setSourceCodeExercise] = React.useState(null);
  const [resultData, setResultData] = React.useState(null);

  const handleChangeSourceCode = (value) => {
    if (!value) return;
    if (isContest) {
      setSourceCodeOfContest((prevSourceCode) => [
        ...prevSourceCode.slice(0, currentExercise),
        value,
        ...prevSourceCode.slice(currentExercise + 1),
      ]);

      return;
    }
    setSourceCodeExercise(value);
  };

  const handleClick = async (data, sourceCode, type) => {
    const result = await runCode(data, sourceCode, type);
    if (isContest) {
      setResultDataContest((prevResult) => [
        ...prevResult.slice(0, currentExercise),
        result,
        ...prevResult.slice(currentExercise + 1),
      ]);
      return;
    }

    setResultData(result);
  };

  const handleSubmit = async () => {
    await runCode(data, sourceCodeExercise, CodeType.Exercise, resultData);
    navigate(-1);
  };

  const monaco = useMonaco();
  React.useEffect(() => {
    if (monaco) {
      import('monaco-themes/themes/Dracula.json').then((data) => {
        monaco.editor.defineTheme('dracula', data);
        monaco.editor.setTheme('dracula');
      });
    }
  }, [monaco]);

  return (
    <Helmet title={data.name}>
      <div className="wrapper">
        <div className="panel left" style={{ width: '45%' }}>
          <div className="problem">
            <center>
              <h3>{data?.name}</h3>
            </center>
            <div data-color-mode="light">
              <div className="wmde-markdown-var"> </div>
              <MDView source={data?.des} />
            </div>
          </div>
        </div>

        <div className="panel right">
          <div className="editor_header">
            <div className="editor_header_language">
              <span>Change Language </span>
              <div className="editor_header_language_input" onClick={() => setShowDropdown(true)}>
                <span>{language.value}</span>
                <i className="bx bx-chevron-down"></i>
                {showDropdown && (
                  <Dropdown setActive={setShowDropdown} darkMode={true}>
                    {Object.keys(languageOptions).map((key, index) => (
                      <div className="dropdown_item" key={index} onClick={() => setLanguage(languageOptions[key])}>
                        {languageOptions[key].value}
                      </div>
                    ))}
                  </Dropdown>
                )}
              </div>
            </div>
          </div>
          <div className="editor_body">
            <MonacoEditor
              className="monaco"
              options={{
                minimap: {
                  enabled: false,
                },
                fontFamily: 'SF_Mono',
                fontSize: 14,
              }}
              theme="dracula"
              language={language.value}
              value={!isContest ? null : sourceCodeOfContest[currentExercise]}
              onChange={(value) => handleChangeSourceCode(value)}
            />
            <div className="testcase">
              <div className="testcase_header">
                <div
                  className={`testcase_header_item ${currentTab === 0 ? 'active' : ''}`}
                  onClick={() => setCurrentTab(0)}
                >
                  Test Case
                </div>
                <div
                  className={`testcase_header_item ${currentTab === 1 ? 'active' : ''}`}
                  onClick={() => setCurrentTab(1)}
                >
                  Console
                </div>
              </div>
              <div className="testcase_body">
                <div className="testcase_body_list">
                  {data.metadata.map((_, index) => (
                    <div
                      key={index}
                      className={`testcase_body_list_item ${currentCase === index ? 'active' : ''}`}
                      onClick={() => setCurrentCase(index)}
                    >
                      <span>Case {index + 1}</span>
                      <div className="testcase_body_list_item_icon">
                        {loading && <div className="circleLoading sm"></div>}
                        {resultData && !loading && (
                          <div className="status">
                            {resultData[index]?.data.status.id === 3 ? (
                              <i className="bx bxs-check-circle color-green" />
                            ) : (
                              <i className="bx bxs-x-circle color-red" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="testcase_body_result">
                  {currentTab === 0 && (
                    <>
                      <div className="testcase_body_result_item">
                        <span>Input</span>
                        <div className="testcase_body_result_item_value">
                          {data.metadata[currentCase].input ? data.metadata[currentCase].input : '[]'}
                        </div>
                      </div>
                      <div className="testcase_body_result_item">
                        <span>Expected</span>
                        <div className="testcase_body_result_item_value">
                          {data.metadata[currentCase].output ? data.metadata[currentCase].output : '[]'}
                        </div>
                      </div>
                      <div className="testcase_body_result_item">
                        <span>Time Limit</span>
                        <div className="testcase_body_result_item_value">
                          {data.metadata[currentCase].output ? data.metadata[currentCase].time : 1000}
                        </div>
                      </div>
                    </>
                  )}
                  {currentTab === 1 && (
                    <div className="testcase_body_result_console">
                      {resultData ? (
                        <React.Fragment>
                          <span>Time Excute: </span>
                          {resultData[currentCase].data.time || 0} ms
                          {resultData[currentCase].data?.stdout ? (
                            <div className="testcase_body_result_item">{resultData[currentCase].data.stdout}</div>
                          ) : (
                            <div className="message-error">
                              {resultData[currentCase].data.compile_output || resultData[currentCase].data.stderr}
                            </div>
                          )}
                        </React.Fragment>
                      ) : (
                        <div className="testcase_body_result_console_empty">
                          <span>EMPTY CONSOLE</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="editor_submit">
              <Button
                onClick={() =>
                  handleClick(
                    data,
                    isContest ? sourceCodeOfContest[currentExercise] : sourceCodeExercise,
                    CodeType.Exercise,
                  )
                }
                backgroundColor="green"
                isDisabled={!auth.isLogged}
              >
                Run Code
              </Button>
              {!isContest && (
                <Button onClick={handleSubmit} isDisabled={!auth.isLogged || !resultData}>
                  Submit
                </Button>
              )}
            </div>
          </div>
        </div>
        {!isContest && (
          <div className="btn_popup" onClick={() => setShowDiscuss(true)}>
            <i className="bx bxs-message-rounded bx-md" />
            <span>Hỏi đáp</span>
          </div>
        )}
        {showDiscuss && <Discuss exerciseId={data.id} setShowDiscuss={setShowDiscuss} />}
      </div>
    </Helmet>
  );
};

export default ProblemSolve;
