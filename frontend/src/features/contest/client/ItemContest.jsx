import React from 'react';
import { Link } from 'react-router-dom';
import LogoUTC from '../../../assets/images/logo-utc.png';
import { conversionURL } from './ConversionURL';
import { format } from 'date-fns';
import moment from 'moment';
import Button from 'components/Button';

const ItemContest = ({ contestsList, currUserId }) => {
  const statusStart = 'Đang diễn ra';
  const statusEnd = 'Đã kết thúc';

  const handleFilterTag = (items) => {
    let topicsList = [];

    for (let item of items) {
      if (!topicsList.length) {
        topicsList = item.topic;
        continue;
      }
      // eslint-disable-next-line no-loop-func
      let diff = item.topic.filter((x) => !topicsList.includes(x));
      topicsList = [...topicsList, ...diff];
    }
    return topicsList;
  };
  return (
    <div className="panel_body">
      <ol>
        {contestsList.map((item) => (
          <li key={item.id}>
            <div className="body_card">
              <img src={item.logoUrl || LogoUTC} alt="" />
              <div className="body_card--content">
                <h3>{item.name}</h3>
                <p title={item.des}>{item.des}</p>
                <div className="topic">
                  {handleFilterTag(item.exercises).map((topic, index) => (
                    <div className="topic--item" key={index}>
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
              <div className="body_card--item">
                <div className="date">
                  <i className="bx bx-calendar bx-md"></i>
                  {format(new Date(item.startDate), 'dd-MM-yyyy - HH:mm:ss')}
                  <b>&nbsp;&nbsp;-&nbsp;&nbsp;</b>
                  {format(new Date(item.endDate), 'dd-MM-yyyy - HH:mm:ss')}
                </div>
                <div className="date">
                  <i className="bx bx-user bx-md"></i>
                  {item.contest_results_aggregate.aggregate.count}
                </div>

                {moment(item.startDate) < moment() && moment(item.endDate) > moment() ? (
                  <div className="body_card--item_right">
                    <div className="status">
                      <i className="bx bxs-circle color-green"></i> {statusStart}
                    </div>
                    {item?.contest_results?.filter((user) => user.createdBy === currUserId).length ? (
                      <Button isDisabled={true}>Đã làm</Button>
                    ) : (
                      <Button>
                        <Link to={`/contest/${conversionURL(item.name)}/competition`} state={{ contestId: item.id }}>
                          Làm bài
                        </Link>
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="body_card--item_right">
                    <div className="status">
                      <i className="bx bxs-circle color-red"></i> {statusEnd}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ItemContest;
