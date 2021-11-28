import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import './Timeline.css';
import Navbar from 'src/components/Navbar.js';
import LoadingPage from 'src/components/LoadingPage.js';
import { backendURL } from 'src/components/constants.js';

import arrow_down_icon from 'src/assets/arrow-down.svg';
import arrow_up_icon from 'src/assets/arrow-up.svg';
import box_arrow_in_up_right from 'src/assets/box-arrow-in-up-right.svg';
import trash_icon from 'src/assets/trash.svg';

const TimelineObject = (obj, canEdit) => {
  let start_date = new Date(obj.start_date);
  let end_date = new Date(obj.end_date);

  const DDMMTIME = (date) => {
    return `${date.toDateString()}`
  }

  return (
    <>
      <Container className='TimelineObjectPreviewBox' onClick={(e) => {
        let dom = e.target;
        while (!dom.className.includes('TimelineObjectPreviewBox')) {
          dom = dom.parentElement;
        }

        dom.style.display = 'none';
        dom.nextSibling.style.display = 'block';
      }}>
        <Row>
          <Col className='align-self-start' xs={1}>
            <img src={arrow_down_icon} height='15px' style={{position: 'relative', top: '5px'}}/>
          </Col>
          <Col>
            <p className='TimelineObjectText' style={{position: 'relative', top: '6px'}}>
              {obj.assignment_title}
            </p>
          </Col>
          <Col className='align-self-end d-flex flex-row-reverse'>
            <p className='TimelineObjectText' style={{position: 'relative', top: '6px'}}>
              Completion date: {DDMMTIME(end_date)} 
              {(() => {
                if (canEdit) {
                  return (
                    <img 
                      src={trash_icon} 
                      height='20px' 
                      className='TrashIcon'
                      onClick={(e) => {
                        console.log(e.target);
                      }}/>
                  );
                }

                return (
                  <>
                  </>
                );
              })()}
            </p>
          </Col>
        </Row>
      </Container>
      <Container className='TimelineObjectDetailedBox' onClick={(e) => {
        let dom = e.target;
        while (!dom.className.includes('TimelineObjectDetailedBox')) {
          dom = dom.parentElement;
        }

        dom.style.display = 'none';
        dom.previousSibling.style.display = 'block';
      }}>
        <Row>
          <Col className='align-self-start' xs={1}>
            <img src={arrow_up_icon} height='15px' style={{position: 'relative', top: '5px'}}/>
          </Col>
          <Col>
            <p className='TimelineObjectText' style={{position: 'relative', top: '6px'}}>
              {obj.assignment_title}
            </p>
          </Col>
          <Col className='align-self-end d-flex flex-row-reverse'>
            <p className='TimelineObjectText' style={{position: 'relative', top: '6px'}}>
              {(() => {
                if (canEdit) {
                  return (
                    <>
                      <img
                        src={box_arrow_in_up_right}
                        height='20px'
                        className='EditIcon'
                        onClick={(e) => {
                          console.log(e.target);
                        }}/>
                      <img 
                        src={trash_icon} 
                        height='20px' 
                        className='TrashIcon'
                        onClick={(e) => {
                          console.log(e.target);
                        }}/>
                    </>
                  );
                }

                return (
                  <>
                  </>
                );
              })()}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='TimelineObjectDetailedDescription'>
              <p className='TimelineObjectText' style={{marginLeft: '10px'}}>
                {obj.assignment_description}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

const Timeline = () => {
  const [isLoading, set_isLoading] = useState(true);
  const [page, set_page] = useState(false);

  // This gets our website key so we can log in securely
  const GetWebsiteKey = () => {
    return new URLSearchParams(useLocation().search).get('website_key');
  }
  const GetGuildID = () => {
    return new URLSearchParams(useLocation().search).get('guild_id');
  }

  const website_key = GetWebsiteKey();
  const guild_id = GetGuildID();

  useEffect(() => {
    if (isLoading) {
      axios.get(`${backendURL}/timeline?website_key=${website_key}`)
        .then((result, error) => {
          if (error) {
            console.error(error);
          } else {
            let jsxArr = [];
            console.log(result.data);
            let canEdit = false;

            result.data.forEach((e) => {
              if (Array.isArray(e)) {
                e.forEach((ee) => {
                  if (canEdit) return 0;
                  if (ee.editor || ee.owner) {
                    canEdit = true;
                  }
                });
              } else if (e.editor || e.owner) {
                canEdit = true;
              }
                if (canEdit) return 0;
            });

            result.data.forEach((e) => {
              if (Array.isArray(e)) {
                e.forEach((ee) => {
                  jsxArr.push(TimelineObject(ee,canEdit));
                });
              } else {
                jsxArr.push(TimelineObject(e, canEdit));
              }
            });
            set_page(
              <div id='TimelinePage'>
                {jsxArr}
              </div>
            );

            set_isLoading(false);
          }
        })
    }
  });

  if (isLoading) {
    return (
      <>
        {Navbar()}
        {LoadingPage()}
      </>
    );
  }

  return (
    <>
      {Navbar()}
      {page}
    </>
  );
}

export default Timeline;
