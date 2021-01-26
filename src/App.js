import React, { Component, useState, useEffect } from "react";
import "./App.css";
import moment from "moment";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CSVLink } from "react-csv";

const activityPresets = [
  "おこしはじめ", 
  "きがえ", 
  "ごはん", 
  "ほいくえんじゅんび",
  "しゅっぱつ",
  "きたく",
  "おふろ",
  "ドリル",
  "日記",
  "テレビ",
  "ゲーム",
  "クリエイティブな遊び",
  "ボーっとする",
  "不明"];

const ResultsPane = props => {
  const flatTextForClipboard = props.activityInstances
    .map(a => a.time + "\t" + a.activityName)
    .join("\n");
  const flatTextForURI = encodeURI(flatTextForClipboard);

  const csvReport = props.activityInstances.map(a => ({
    time: a.time,
    activity: a.activityName
  }));

  return (
    <div>
      <table>
        <tbody>
          {props.activityInstances.map(a => (
            <tr key={"ResultsPaneTableTr"+a.id}>
              <td>{a.id}</td>
              <td>{a.time}</td>
              <td>{a.activityName}</td>
              <td>
                <button onClick={() => props.deleteActivity(a)}>削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <CopyToClipboard text={flatTextForClipboard}>
          <button>クリップボードにコピー</button>
        </CopyToClipboard>
      </p>
      <p>
        <CSVLink data={csvReport}><button>CSVファイルをダウンロード</button></CSVLink>
      </p>
      <p>
        <a target="_blank" href={"mailto:ken@kawamoto.co.uk?subject=タイムキーパー"+moment().format("YYYY/MM/DD")+"&body="+flatTextForURI}><button>メール</button></a>
      </p>
      <hr />
      <p>
      <button onClick={props.deleteAllActivities}>全部削除</button>
      </p>
    </div>
  );
};

const ActivityButton = props => {
  const clickHandler = () =>
    props.addActivityCallback(props.activityName);

  return (
    <p className="Activity">
      <button className="activityButton" onClick={clickHandler}>
        {props.activityName}
      </button>
    </p>
  );
};

const InputPane = props => {
  return (
    <div className="Activities">
      {activityPresets.map(a => (
        <ActivityButton
          key={"ActivityButton"+a}
          activityName={a}
          addActivityCallback={props.addActivityCallback}
        ></ActivityButton>
      ))}
    </div>
  );
};

const LSKeyActivityInstances = "tmpActivityInstances2";

const tryGetFromStorage = () => {
  try {
    let parsed = JSON.parse(localStorage.getItem(LSKeyActivityInstances));
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  }catch (error) {
    console.log("json parse error: "+error+" "+localStorage.getItem(LSKeyActivityInstances));
  }
  return [];
};

const MainContents = () => {
  const [activityInstances, setActivityInstances] = useState(tryGetFromStorage());
  
  const appendActivityInstance = activityName => {
    let id = activityInstances.length===0 ? 0 : activityInstances[activityInstances.length-1].id + 1;
    let newActivity = {
      id: id,
      activityName: activityName,
      time: moment().format("YYYY/MM/DD HH:mm:ss"),
    };
    setActivityInstances([...activityInstances, newActivity]);
  };
  const deleteActivity = activity =>
    setActivityInstances(
      activityInstances.filter(
        a => JSON.stringify(a) !== JSON.stringify(activity)
      )
    );
  const deleteAllActivities = () => {
    if (!window.confirm("本当に全部消しますか？"))return;
    setActivityInstances([]);
  };

  // Save activity in storage.
  useEffect(() => {
    localStorage.setItem(LSKeyActivityInstances, JSON.stringify(activityInstances));
  }, [activityInstances]);

  return (
    <div>
      <InputPane addActivityCallback={appendActivityInstance}></InputPane>
      <ResultsPane
        activityInstances={activityInstances}
        deleteActivity={deleteActivity}
        deleteAllActivities={deleteAllActivities}
      ></ResultsPane>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainContents></MainContents>
      </div>
    );
  }
}

export default App;
