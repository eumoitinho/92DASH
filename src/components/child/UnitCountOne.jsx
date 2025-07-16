import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react';
const UnitCountOne = ({ stats = {} }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [defaultStats, setDefaultStats] = useState({
        totalUsers: 0,
        totalClients: 0,
        totalRevenue: 0,
        totalConversions: 0,
        totalSpend: 0
    });

    useEffect(() => {
        if (Object.keys(stats).length > 0) {
            setIsLoading(false);
        }
    }, [stats]);

    const displayStats = Object.keys(stats).length > 0 ? stats : defaultStats;

    return (
        <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-1 h-100">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Total Clients</p>
                                <h6 className="mb-0">{isLoading ? '...' : displayStats.totalClients || 0}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="gridicons:multiple-users"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                        <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                            <span className="d-inline-flex align-items-center gap-1 text-success-main">
                                <Icon icon="bxs:up-arrow" className="text-xs" /> {displayStats.activeClients || 0}
                            </span>
                            Active clients
                        </p>
                    </div>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-2 h-100">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">
                                    Total Revenue
                                </p>
                                <h6 className="mb-0">R$ {isLoading ? '...' : (displayStats.totalRevenue || 0).toLocaleString()}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="fa-solid:award"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                        <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                            <span className="d-inline-flex align-items-center gap-1 text-success-main">
                                <Icon icon="bxs:up-arrow" className="text-xs" /> {displayStats.totalSpend || 0}
                            </span>
                            Total Ad Spend
                        </p>
                    </div>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-3 h-100">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">
                                    Total Conversions
                                </p>
                                <h6 className="mb-0">{isLoading ? '...' : displayStats.totalConversions || 0}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="fluent:people-20-filled"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                        <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                            <span className="d-inline-flex align-items-center gap-1 text-success-main">
                                <Icon icon="bxs:up-arrow" className="text-xs" /> {displayStats.avgConversionRate || 0}%
                            </span>
                            Avg Conversion Rate
                        </p>
                    </div>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-4 h-100">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Monthly Budget</p>
                                <h6 className="mb-0">R$ {isLoading ? '...' : (displayStats.monthlyBudget || 0).toLocaleString()}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="solar:wallet-bold"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                        <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                            <span className="d-inline-flex align-items-center gap-1 text-success-main">
                                <Icon icon="bxs:up-arrow" className="text-xs" /> R$ {(displayStats.monthlyBudget || 0).toLocaleString()}
                            </span>
                            Monthly Budget Total
                        </p>
                    </div>
                </div>
                {/* card end */}
            </div>
        </div>

    )
}

export default UnitCountOne