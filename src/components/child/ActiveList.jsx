import React from 'react'

const ActiveList = ({ activities = [] }) => {
    const defaultActivities = [
        { id: 1, text: "No recent activities", priority: 'low' },
    ];
    
    const displayActivities = activities.length > 0 ? activities : defaultActivities;
    
    return (
        <div className="col-md-6">
            <div className="card h-100 p-0">
                <div className="card-header border-bottom bg-base py-16 px-24">
                    <h6 className="text-lg fw-semibold mb-0">Recent Activities</h6>
                </div>
                <div className="card-body p-24">
                    <ul className="list-group radius-8">
                        {displayActivities.slice(0, 5).map((activity, index) => (
                            <li 
                                key={activity.id || index} 
                                className={`list-group-item border text-secondary-light p-16 ${
                                    index === 0 ? 'bg-primary-600 text-white' : 'bg-base'
                                } ${index < displayActivities.length - 1 ? 'border-bottom-0' : ''}`}
                            >
                                {index + 1}. {activity.text || activity.description || 'Unknown activity'}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ActiveList