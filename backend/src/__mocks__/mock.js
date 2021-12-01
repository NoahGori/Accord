const getTimelineAssignmentObjectsViaWebsiteKeyAsync = () =>{
    return [
      [
        {
          timeline_id: 5,
          discord_id: '207922540163760335',
          start_date: '2022-10-22T14:22:09.000Z',
          end_date: '2022-10-30T14:22:09.000Z',
          assignment_title: 'Assignment1',
          assignment_description: 'Assignment 1s description',
          status: 'active',
          owner: false,
          editor: true,
          worker: false
        }
      ]
    ];
};

const getAllTimelineObjectsWithTimelineId = () => {
  return [
      {
        timeline_id: 5,
        discord_id: '207922540163760335',
        start_date: '2022-10-22T14:22:09.000Z',
        end_date: '2022-10-30T14:22:09.000Z',
        assignment_title: 'Assignment1',
        assignment_description: 'Assignment 1s description',
        status: 'active',
      }
  ];
};

const getCreatedTimeline = () =>{
  return [
    [
      {
        timeline_id: 5,
        discord_id: '207922540163760335',
        start_date: '2022-10-22T14:22:09.000Z',
        end_date: '2022-10-30T14:22:09.000Z',
        assignment_title: 'Assignment1',
        assignment_description: 'Assignment 1s description',
        status: 'active',
        owner: false,
        editor: true,
        worker: false
      }
    ],
    [
      {
        timeline_id: 6,
        discord_id: '207922540163760335',
        start_date: '2022-10-22T14:22:09.000Z',
        end_date: '2022-10-23T14:22:09.000Z',
        assignment_title: 'Assignment1',
        assignment_description: 'Assignment1',
        status: 'active',
        owner: true,
        editor: false,
        worker: false
      }
    ]
  ]
}



exports.getTimelineAssignmentObjectsViaWebsiteKeyAsync=getTimelineAssignmentObjectsViaWebsiteKeyAsync;
exports.getAllTimelineObjectsWithTimelineId = getAllTimelineObjectsWithTimelineId;
exports.getCreatedTimeline=getCreatedTimeline;