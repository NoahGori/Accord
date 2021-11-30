import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button
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
import plus_circle_fill_icon from 'src/assets/plus-circle-fill.svg';

const TimelineObject = (obj, canEdit) => {
  let start_date = new Date(obj.start_date);
  let end_date = new Date(obj.end_date);
  let simplified_start_date=start_date.toISOString().substr(0,start_date.toISOString().match('[a-zA-Z]').index);
  let simplified_end_date=end_date.toISOString().substr(0,end_date.toISOString().match('[a-zA-Z]').index);

  const DDMMTIME = (date) => {
    return `${date.toDateString()}`
  }

  const StatusDropdown = () => {
    return (
      <>
      </>
    );
  }

  const UpdateTimelineObject = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    let start_date=data.get('start_date').split('-');
    start_date= new Date(Date(start_date[2], start_date[1]-1, start_date[0])).toISOString().replace('T',' ').replace('Z','');
    let end_date=data.get('end_date').split('-');
    end_date= new Date(Date(end_date[2], end_date[1]-1, end_date[0])).toISOString().replace('T',' ').replace('Z','');
    let updateJSON={
      title: data.get('title'),
      description: data.get('description'),
      start_date: start_date,
      end_date: end_date,
      status: data.get('status'),
    }

    axios.put(`${backendURL}/timeline`, {
      timeline_id: obj.timeline_id,
      discord_id: obj.discord_id,
      old_start_date: obj.start_date,
      old_end_date: obj.end_date,
      old_assignment_title: obj.assignment_title,
      old_assignment_description: obj.assignment_description,
      old_status: obj.status,
      new_start_date: updateJSON.start_date,
      new_end_date: updateJSON.end_date,
      new_assignment_title: updateJSON.title,
      new_assignment_description: updateJSON.description,
      new_status: updateJSON.status
    }) 
      .then((result,error)=> {
        if (error) 
          console.error(error);
        else
          window.location.reload();
      }
      );
  };

  const EditAndDeleteIcons = () => {
    return (
      <>
        <img
          src={box_arrow_in_up_right}
          height='20px'
          className='EditIcon'
          onClick={(e) => {
            let dom = e.target;

            while (!(dom.className.includes('TimelineObjectPreviewBox') || dom.className.includes('TimelineObjectDetailedBox'))) {
              dom = dom.parentElement;
            }

            let pb = undefined;
            let db = undefined;
            let eb = undefined;
            if (dom.className.includes('TimelineObjectPreviewBox')) {
              pb = dom;
              while (!(dom.className.includes('TimelineObjectDetailedBox'))) {
                dom = dom.nextSibling;
              }

              db = dom;
            } else {
              db = dom;
              while(!(dom.className.includes('TimelineObjectPreviewBox'))) {
                dom = dom.previousSibling;
              }

              pb = dom;
            }

            while (!(dom.className.includes('TimelineObjectEditForm'))) {
              dom = dom.nextSibling;
            }

            eb = dom;

            pb.style.display = 'None';
            db.style.display = 'None';
            eb.style.display = 'Block';
          }}/>
        <img 
          src={trash_icon} 
          height='20px' 
          className='TrashIcon'
          onClick={(e) => {
            axios.post(`${backendURL}/timeline`, {
              DELETE: true,
              timeline_id: obj.timeline_id,
              discord_id: obj.discord_id,
              start_date: obj.start_date,
              end_date: obj.end_date,
              assignment_title: obj.assignment_title,
              assignment_description: obj.assignment_description,
              status: obj.status
            })
              .then((result, error) => {
                if (error) {
                  console.error(error);
                } else {
                  window.location.reload();
                }
              });
          }}/>
      </>
    );
  }

  function Expand(e) {
    let dom = e.target;
    while (!dom.className.includes('TimelineObjectPreviewBox')) {
      dom = dom.parentElement;
    }

    dom.style.display = 'none';
    dom.nextSibling.style.display = 'block';
  }

  function Collapse(e) {
    let dom = e.target;
    while (!(dom.className.includes('TimelineObjectDetailedBox') || dom.className.includes('TimelineObjectEditForm'))) {
      dom = dom.parentElement;
    }

    dom.style.display = 'none';
    dom.previousSibling.style.display = 'block';
  }

  return (
    <>
      <Container className='TimelineObjectBox TimelineObjectPreviewBox'>
        <Row>
          <Col className='align-self-start' xs={1} onClick={Expand} style={{cursor: 'pointer'}}>
            <img src={arrow_down_icon} height='15px' style={{position: 'relative', top: '5px'}}/>
          </Col>
          <Col onClick={Expand} style={{cursor: 'pointer'}}>
            <p className='TimelineObjectText' style={{position: 'relative', top: '6px'}}>
              {obj.assignment_title}
            </p>
          </Col>
          <Col className='align-self-end d-flex flex-row-reverse'>
            <p className='TimelineObjectText' style={{position: 'relative', top: '6px'}}>
              {obj.status}
              {(() => {
                if (canEdit) {
                  return EditAndDeleteIcons();
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
      <Container className='TimelineObjectBox TimelineObjectDetailedBox'>
        <Row>
          <Col className='align-self-start' xs={1} onClick={Collapse} style={{cursor: 'pointer'}}>
            <img src={arrow_up_icon} height='15px' style={{position: 'relative', top: '5px'}}/>
          </Col>
          <Col>
            <p className='TimelineObjectText' onClick={Collapse} style={{cursor: 'pointer', position: 'relative', top: '6px'}}>
              {obj.assignment_title}
            </p>
          </Col>
          <Col className='align-self-end d-flex flex-row-reverse'>
            <p className='TimelineObjectText' style={{position: 'relative', top: '6px'}}>
              {obj.status}
              {(() => {
                if (canEdit) {
                  return EditAndDeleteIcons();
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
            <p className='TimelineObjectText' style={{position: 'relative', margin: '10px'}}>
              {DDMMTIME(start_date)} - {DDMMTIME(end_date)} 
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
      {(() => {
        if (canEdit) {
          return (
            <>
              <Container className='TimelineObjectBox TimelineObjectEditForm'>       
                <Row>
                  <Col className='align-self-start' xs={1} onClick={Collapse} style={{cursor: 'pointer', marginBottom: '15px'}}>
                    <img src={arrow_up_icon} height='15px' style={{position: 'relative', top: '5px'}}/>
                  </Col>          
                </Row>
                <Row>
                  <Form onSubmit={UpdateTimelineObject}>
                    <Row>
                      <Form.Group className='mb-3' controlId='title'>
                        <Form.Label className='TimelineObjectText'>Title</Form.Label>
                        <Form.Control name='title' type='text' placeholder='title' defaultValue={obj.assignment_title}/>
                      </Form.Group>
                    </Row>

                    <Row>
                      <Form.Group className='mb-3' controlId='description'>
                        <Form.Label className='TimelineObjectText'>Description</Form.Label>
                        <Form.Control
                          style={{height: '200px'}}
                          name='description'
                          as='textarea'
                          type='textarea'
                          placeholder='description'
                          defaultValue={obj.assignment_description}/>
                      </Form.Group>
                    </Row>

                    <Row>
                      <Col xs={2}>
                        <Form.Group controlId='start_date'>
                          <Form.Label className='TimelineObjectText'>Assignment start date</Form.Label>
                          <Form.Control name='start_date' type='date' defaultValue={simplified_start_date}/>
                        </Form.Group>
                      </Col>
                      <Col xs={2}>
                        <Form.Group controlId='end_date'>
                          <Form.Label className='TimelineObjectText'>Assignment end date</Form.Label>
                          <Form.Control name='end_date' type='date' defaultValue={simplified_end_date}/>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className='InputDate' controlId='status'>
                          <Form.Label className='TimelineObjectText'>Status</Form.Label>
                          <Form.Control name='status' type='text' defaultValue={obj.status}/>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="primary" type="submit" style={{marginBottom:'15px',marginTop:'15px'}}>
                      Submit
                    </Button>
                  </Form>
                </Row>
              </Container>
            </>
          );
        }

        return (
          <>
          </>
        );
      })()}
    </>
  )
}

const Timeline = () => {
  const [isLoading, set_isLoading] = useState(true);
  const [page, set_page] = useState(undefined);

  // This gets our website key so we can log in securely
  const GetWebsiteKey = () => {
    return new URLSearchParams(useLocation().search).get('website_key');
  }

  const AddTimelineObject = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    let start_date=data.get('start_date').split('-');
    start_date= new Date(Date(start_date[2], start_date[1]-1, start_date[0])).toISOString().replace('T',' ').replace('Z','');
    let end_date=data.get('end_date').split('-');
    end_date= new Date(Date(end_date[2], end_date[1]-1, end_date[0])).toISOString().replace('T',' ').replace('Z','');
    let insertJSON={
      assignment_title: data.get('title'),
      assignment_description: data.get('description'),
      start_date: start_date,
      end_date: end_date,
      status: data.get('status'),
      timeline_id: data.get('timeline_id'),
      discord_id: data.get('discord_id')
    }

    try {
      axios.post(`${backendURL}/timeline`, insertJSON).then((res) => {
        console.error(res);

        window.location.reload();
      }).catch((error) => {
        console.error(error);
        alert(`Please make sure that the user with the corresponding discord_id (${insertJSON.discord_id}) has made an account with us! Look up the discord_id info with this website: https://discord.id/`);
      });
    } catch(error) {
      console.error(error);
      alert(`Please make sure that the user with the corresponding discord_id (${insertJSON.discord_id}) has made an account with us! Look up the discord_id info with this website: https://discord.id/`);
    }
  }

  const website_key = GetWebsiteKey();

  useEffect(() => {
    if (isLoading) {
      axios.get(`${backendURL}/accounts?website_key=${website_key}`)
        .then((result, error) => {
          if (error) {
            console.error(error);
          } else {
            return axios.get(`${backendURL}/timeline?discord_id=${result.data[0].discord_id}`)
              .then((result, error) => {
                if (error) {
                  console.error(error);
                } else {
                  let editable_timelines = [];
                  result.data.forEach((e) => {
                    if (e.editor || e.owner) {
                      editable_timelines.push(e.timeline_id);
                    }
                  });
                  return axios.get(`${backendURL}/timeline?website_key=${website_key}`)
                    .then((result, error) => {
                      if (error) {
                        console.error(error);
                      } else {
                        let jsxArr = [];
                        let canEdit = false;
                        result.data.forEach((e) => {
                          if (Array.isArray(e)) {
                            e.forEach((ee) => {
                              if (ee.editor || ee.owner) {
                                jsxArr.push(TimelineObject(ee, true));
                                canEdit = true;
                              } else {
                                jsxArr.push(TimelineObject(ee, false));
                              }
                            });
                          } else if (e.editor || e.owner) {
                            jsxArr.push(TimelineObject(e, true));
                            canEdit = true;
                          } else {
                            jsxArr.push(TimelineObject(e, false));
                          }
                        });
                        set_page(
                          <div id='TimelinePage'>
                            {jsxArr}
                            {(() => {
                              if (canEdit) {
                                return (
                                  <>
                                    <Container className='d-flex align-items-center justify-content-center'>
                                      <img
                                        src={plus_circle_fill_icon}
                                        className='PlusCircleFillIcon'
                                        onClick={(e)=> {
                                          let dom = e.target;
                                          let form = dom.parentElement.nextSibling;
                                          let img = dom;

                                          img.style.display='None';
                                          form.style.display='Block';
                                        }}
                                      />
                                    </Container>
                                    <Container className='TimelineObjectBox AddTimelineObjectBox' style={{paddingTop:'10px'}}>
                                      <Form onSubmit={AddTimelineObject}>
                                        <Row>
                                          <Col>
                                            <Form.Group className='mb-3' controlId='discord_id'>
                                              <Form.Label className='TimelineObjectText'>Discord_id</Form.Label>
                                              <Form.Control required name='discord_id' type='text' placeholder='discord_id'/>
                                              <Form.Text className="text-muted">
                                                <a href='https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-'>Tutorial on how to get discord_id</a>
                                              </Form.Text>
                                            </Form.Group>
                                          </Col>
                                          <Col xs={3}>
                                            <Form.Group>
                                              <Form.Label className='TimelineObjectText'>timeline_id</Form.Label>
                                              <Form.Select required name='timeline_id'>
                                                {(() => {
                                                  let selectJsxArr = []
                                                  editable_timelines.forEach((e) => {
                                                    selectJsxArr.push(<option className='TimelineObjectText' value={e}>{e}</option>);
                                                  });
                                                  return (
                                                    <>
                                                      {selectJsxArr}
                                                    </>
                                                  );
                                                })()}
                                              </Form.Select>
                                              <Form.Text>
                                                <Button className='check_timeline_id_button' onClick={(e)=> {
                                                  let dom = e.target;
                                                  let timeline_id = dom.parentElement.previousSibling.value;
                                                  window.open(`${window.location.origin}/ViewTimeline?timeline_id=${timeline_id}`);
                                                }}>
                                                  timeline information</Button>
                                              </Form.Text>
                                            </Form.Group>
                                          </Col>
                                        </Row>

                                        <Row>
                                          <Form.Group className='mb-3' controlId='title'>
                                            <Form.Label className='TimelineObjectText'>Title</Form.Label>
                                            <Form.Control name='title' type='text' placeholder='title'/>
                                          </Form.Group>
                                        </Row>

                                        <Row>
                                          <Form.Group className='mb-3' controlId='description'>
                                            <Form.Label className='TimelineObjectText'>Description</Form.Label>
                                            <Form.Control
                                              style={{height: '200px'}}
                                              name='description'
                                              as='textarea'
                                              type='textarea'
                                              placeholder='description'/>
                                          </Form.Group>
                                        </Row>

                                        <Row>
                                          <Col xs={2}>
                                            <Form.Group controlId='start_date'>
                                              <Form.Label className='TimelineObjectText'>Assignment start date</Form.Label>
                                              <Form.Control name='start_date' type='date'/>
                                            </Form.Group>
                                          </Col>
                                          <Col xs={2}>
                                            <Form.Group controlId='end_date'>
                                              <Form.Label className='TimelineObjectText'>Assignment end date</Form.Label>
                                              <Form.Control name='end_date' type='date'/>
                                            </Form.Group>
                                          </Col>
                                          <Col>
                                            <Form.Group className='InputDate' controlId='status'>
                                              <Form.Label className='TimelineObjectText'>Status</Form.Label>
                                              <Form.Control name='status' type='text' placeholder='incomplete'/>
                                            </Form.Group>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col>
                                            <Button variant="primary" type="submit" className='AddTimelineObjectFormButtons'>
                                              Submit
                                            </Button>
                                            <Button
                                              variant='danger'
                                              className='AddTimelineObjectFormButtons'
                                              onClick={(e)=> {
                                                let dom = e.target
                                                dom = dom.parentElement.parentElement.parentElement.parentElement
                                                dom.style.display='None';
                                                document.getElementsByClassName('PlusCircleFillIcon')[0].style.display='Block';
                                              }}>
                                              Cancel
                                            </Button>
                                          </Col>
                                        </Row>
                                      </Form>
                                    </Container>
                                  </>
                                );
                              }

                              return (
                                <>
                                </>
                              );
                            })()}
                          </div>
                        );

                        set_isLoading(false);
                      }
                    })
                }
              });
          }
        });
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
