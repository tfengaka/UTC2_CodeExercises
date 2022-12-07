import React from 'react';
import Helmet from 'components/Helmet';
import background from '../../assets/images/background.png';
import no1 from '../../assets/images/medal_no1.png';
import no2 from '../../assets/images/medal_no2.png';
import no3 from '../../assets/images/medal_no3.png';
import { useQuery } from '@apollo/client';
import { GET_CONTEST_ID, GET_RANK } from 'graphql/Queries';
import PageLoading from 'components/PageLoading';
import ServerError from 'components/ServerError';
import Dropdown from 'components/Dropdown';
const Rank = () => {
  const contestData = useQuery(GET_CONTEST_ID);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [listContest, setListContest] = React.useState({
    id: contestData.data?.contests[0].id,
    name: contestData.data?.contests[0].name,
  });

  const { loading, error, data } = useQuery(GET_RANK, {
    variables: { contestId: listContest.id || contestData.data?.contests[0].id },
  });

  if (loading || contestData.loading) return <PageLoading />;
  if (error || contestData.error) {
    console.error(error.message);
    return <ServerError />;
  }

  const handleRank = (items) => {
    if (items === 1) {
      return <img src={no1} alt="no1" />;
    } else if (items === 2) {
      return <img src={no2} alt="no1" />;
    } else if (items === 3) {
      return <img src={no3} alt="no1" />;
    } else {
      return <span>{items}</span>;
    }
  };

  return (
    <Helmet title="Xếp hạng">
      <div className="rank">
        <div className="rank_head">
          <img src={background} alt="" />
          <div className="rank_head-content">
            <div className="rank_head-content_detail">
              <h1 style={{ textTransform: 'uppercase', textAlign: 'center' }}>
                Bảng xếp hạng <br />
                {listContest.name || contestData.data?.contests[0].name}
              </h1>
            </div>
          </div>
        </div>
        <div className="rank_container">
          <div className="rank_editor">
            <div className="rank_editor_header">
              <span>Chọn tên cuộc thi </span>
              <div className="rank_editor_header-input" onClick={() => setShowDropdown(true)}>
                <span>{listContest.name || contestData.data?.contests[0].name}</span>
                <i className="bx bx-chevron-down"></i>
                {showDropdown && (
                  <Dropdown setActive={setShowDropdown} darkMode={false}>
                    {contestData.data?.contests.map((item, index) => (
                      <div
                        key={index}
                        className="dropdown_item"
                        onClick={() => {
                          setListContest(item);
                          return setTimeout(() => setShowDropdown(false), 1);
                        }}
                      >
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </Dropdown>
                )}
              </div>
            </div>
          </div>
          <div className="rank_body">
            <div className="rank_body_heading">
              <table>
                <colgroup>
                  <col width="100" />
                  <col width="200" />
                  <col width="300" />
                  <col width="300" />
                  <col width="300" />
                </colgroup>
                <thead>
                  <tr>
                    <th className="rank_body_heading_item"></th>
                    <th className="rank_body_heading_item">
                      <div className="rank_cell">
                        <span>Hạng</span>
                      </div>
                    </th>
                    <th className="rank_body_heading_item">
                      <div className="rank_cell">
                        <span>Tên đăng nhập</span>
                      </div>
                    </th>
                    <th className="rank_body_heading_item">
                      <div className="rank_cell">
                        <span>Cuộc thi</span>
                      </div>
                    </th>
                    <th className="rank_body_heading_item">
                      <div className="rank_cell">
                        <span>Tổng điểm</span>
                      </div>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="rank_body_content">
              <table>
                <colgroup>
                  <col width="100" />
                  <col width="200" />
                  <col width="300" />
                  <col width="300" />
                  <col width="300" />
                </colgroup>
                {data?.contests.map((item, index) => (
                  <tbody key={index}>
                    {item.contest_results.map((items, indexs) => (
                      <tr className="rank_row" key={indexs}>
                        <td className="rank_body_content_item"></td>
                        <td className="rank_body_content_item">
                          <div className="rank_cell-logo">{handleRank(indexs + 1)}</div>
                        </td>
                        <td className="rank_body_content_item">
                          <div className="rank_cell">{items.account.fullName}</div>
                        </td>
                        <td className="rank_body_content_item">
                          <div className="rank_cell">{item.name}</div>
                        </td>
                        <td className="rank_body_content_item">
                          <div className="rank_cell">{items.account.contest_results_aggregate.aggregate.sum.point}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Rank;
