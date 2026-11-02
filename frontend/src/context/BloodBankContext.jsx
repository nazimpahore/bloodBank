import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { publicAPI, hospitalAPI, receiverAPI } from '../api/apiClient';

const BloodBankContext = createContext();

const INITIAL_BLOOD_STOCK = [
  { bid: 7, hid: 1, bg: 'A-' },
  { bid: 8, hid: 1, bg: 'O+' },
  { bid: 12, hid: 4, bg: 'A-' },
  { bid: 13, hid: 4, bg: 'A+' },
  { bid: 14, hid: 4, bg: 'AB+' },
  { bid: 16, hid: 5, bg: 'A+' },
  { bid: 17, hid: 5, bg: 'B-' },
  { bid: 18, hid: 5, bg: 'O-' },
  { bid: 20, hid: 5, bg: 'B+' },
  { bid: 21, hid: 6, bg: 'O+' },
  { bid: 22, hid: 6, bg: 'A-' },
  { bid: 23, hid: 6, bg: 'O-' },
  { bid: 24, hid: 7, bg: 'A-' },
  { bid: 25, hid: 7, bg: 'A+' },
  { bid: 26, hid: 7, bg: 'B-' },
  { bid: 27, hid: 7, bg: 'B+' },
  { bid: 31, hid: 1, bg: 'B-' },
];

const INITIAL_COMMUNITY_DONORS = [
  { bdid: 10, rid: 1, bg: 'A+' },
  { bdid: 11, rid: 1, bg: 'B-' },
  { bdid: 12, rid: 4, bg: 'B+' },
  { bdid: 13, rid: 4, bg: 'O+' },
  { bdid: 14, rid: 5, bg: 'B+' },
  { bdid: 15, rid: 5, bg: 'B-' },
  { bdid: 16, rid: 5, bg: 'O+' },
  { bdid: 17, rid: 6, bg: 'B+' },
  { bdid: 18, rid: 6, bg: 'AB+' },
  { bdid: 19, rid: 6, bg: 'A-' },
  { bdid: 20, rid: 7, bg: 'AB-' },
  { bdid: 21, rid: 7, bg: 'A-' },
  { bdid: 22, rid: 7, bg: 'O-' },
  { bdid: 23, rid: 1, bg: 'A-' },
];

const INITIAL_PATIENT_REQUESTS = [
  { reqid: 1, hid: 1, rid: 4, bg: 'A-', status: 'Pending' },
  { reqid: 2, hid: 1, rid: 5, bg: 'O+', status: 'Accepted' },
  { reqid: 3, hid: 4, rid: 1, bg: 'A+', status: 'Pending' },
];

const INITIAL_DONOR_REQUESTS = [
  { donoid: 1, hid: 1, rid: 4, bg: 'B+', status: 'Pending' },
  { donoid: 2, hid: 5, rid: 1, bg: 'A+', status: 'Accepted' },
  { donoid: 3, hid: 4, rid: 7, bg: 'AB-', status: 'Pending' },
];

export function BloodBankProvider({ children }) {
  const { hospitals, receivers, currentUser } = useAuth();

  const [bloodStock, setBloodStock] = useState(() => {
    const saved = localStorage.getItem('lifedrop_blood_stock');
    return saved ? JSON.parse(saved) : INITIAL_BLOOD_STOCK;
  });

  const [communityDonors, setCommunityDonors] = useState(() => {
    const saved = localStorage.getItem('lifedrop_community_donors');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_DONORS;
  });

  const [patientRequests, setPatientRequests] = useState(() => {
    const saved = localStorage.getItem('lifedrop_patient_requests');
    return saved ? JSON.parse(saved) : INITIAL_PATIENT_REQUESTS;
  });

  const [donorRequests, setDonorRequests] = useState(() => {
    const saved = localStorage.getItem('lifedrop_donor_requests');
    return saved ? JSON.parse(saved) : INITIAL_DONOR_REQUESTS;
  });

  const [notification, setNotification] = useState(null);

  // Sync with API on mount or user change
  useEffect(() => {
    async function fetchServerData() {
      const stockRes = await publicAPI.getBloodStock();
      if (stockRes.data && stockRes.data.length > 0) {
        setBloodStock(stockRes.data);
      }

      const donorsRes = await publicAPI.getCommunityDonors();
      if (donorsRes.data && donorsRes.data.length > 0) {
        setCommunityDonors(donorsRes.data);
      }

      const currentId = currentUser?._id || currentUser?.id;
      if (currentUser?.role === 'hospital' && currentId) {
        const reqRes = await hospitalAPI.getRequests(currentId);
        if (reqRes.data) setPatientRequests(reqRes.data);

        const donorReqRes = await hospitalAPI.getDonorRequests(currentId);
        if (donorReqRes.data) setDonorRequests(donorReqRes.data);
      } else if (currentUser?.role === 'receiver' && currentId) {
        const myReqRes = await receiverAPI.getRequests(currentId);
        if (myReqRes.data) setPatientRequests(myReqRes.data);

        const inqRes = await receiverAPI.getInquiries(currentId);
        if (inqRes.data) setDonorRequests(inqRes.data);
      }
    }

    fetchServerData();
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('lifedrop_blood_stock', JSON.stringify(bloodStock));
  }, [bloodStock]);

  useEffect(() => {
    localStorage.setItem('lifedrop_community_donors', JSON.stringify(communityDonors));
  }, [communityDonors]);

  useEffect(() => {
    localStorage.setItem('lifedrop_patient_requests', JSON.stringify(patientRequests));
  }, [patientRequests]);

  useEffect(() => {
    localStorage.setItem('lifedrop_donor_requests', JSON.stringify(donorRequests));
  }, [donorRequests]);

  const notify = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Hospital Actions
  const addHospitalBlood = async (bg) => {
    if (!currentUser || currentUser.role !== 'hospital') return false;
    const currentId = currentUser._id || currentUser.id;

    // Try API
    const res = await hospitalAPI.addStock(currentId, bg);
    if (res.data?.item) {
      setBloodStock(prev => [res.data.item, ...prev]);
      notify('success', `Blood group ${bg} added to hospital inventory!`);
      return true;
    }

    // Local fallback
    const exists = bloodStock.some(item => (item.hid === currentId) && item.bg === bg);
    if (exists) {
      notify('danger', `Blood group ${bg} is already present in your stock.`);
      return false;
    }
    const newItem = { bid: Date.now(), hid: currentId, bg };
    setBloodStock(prev => [newItem, ...prev]);
    notify('success', `Blood group ${bg} added to hospital inventory!`);
    return true;
  };

  const deleteHospitalBlood = async (bid) => {
    await hospitalAPI.deleteStock(bid);
    setBloodStock(prev => prev.filter(item => (item.bid !== bid && item._id !== bid)));
    notify('success', 'Blood sample removed from inventory.');
  };

  // User Actions (Donate blood sample)
  const addDonorSample = async (bg) => {
    if (!currentUser || currentUser.role !== 'receiver') return false;
    const currentId = currentUser._id || currentUser.id;

    // Try API
    const res = await receiverAPI.addDonation(currentId, bg);
    if (res.data?.item) {
      setCommunityDonors(prev => [res.data.item, ...prev]);
      notify('success', `Your blood group ${bg} has been registered in the voluntary donor directory!`);
      return true;
    }

    // Local fallback
    const exists = communityDonors.some(item => (item.rid === currentId) && item.bg === bg);
    if (exists) {
      notify('danger', `You have already registered sample ${bg}.`);
      return false;
    }
    const newItem = { bdid: Date.now(), rid: currentId, bg };
    setCommunityDonors(prev => [newItem, ...prev]);
    notify('success', `Your blood group ${bg} has been registered in the voluntary donor directory!`);
    return true;
  };

  const deleteDonorSample = async (bdid) => {
    await receiverAPI.deleteDonation(bdid);
    setCommunityDonors(prev => prev.filter(item => (item.bdid !== bdid && item._id !== bdid)));
    notify('success', 'Sample listing removed.');
  };

  // Patient requests blood from hospital
  const requestHospitalBlood = async (bid, hid, bg) => {
    if (!currentUser || currentUser.role !== 'receiver') {
      notify('danger', 'You must be logged in as an individual user/donor to request blood.');
      return false;
    }
    const currentId = currentUser._id || currentUser.id;

    const res = await receiverAPI.requestBlood(hid, currentId, bg);
    if (res.data?.request) {
      setPatientRequests(prev => [res.data.request, ...prev]);
      notify('success', 'Blood request submitted successfully to hospital!');
      return true;
    }

    const newReq = { reqid: Date.now(), hid, rid: currentId, bg, status: 'Pending' };
    setPatientRequests(prev => [newReq, ...prev]);
    notify('success', 'Blood request submitted successfully to hospital!');
    return true;
  };

  const acceptPatientRequest = async (reqid) => {
    await hospitalAPI.acceptRequest(reqid);
    setPatientRequests(prev => prev.map(r => (r.reqid === reqid || r._id === reqid) ? { ...r, status: 'Accepted' } : r));
    notify('success', 'Request accepted! Patient has been notified.');
  };

  const rejectPatientRequest = async (reqid) => {
    await hospitalAPI.rejectRequest(reqid);
    setPatientRequests(prev => prev.map(r => (r.reqid === reqid || r._id === reqid) ? { ...r, status: 'Rejected' } : r));
    notify('danger', 'Request declined.');
  };

  const cancelPatientRequest = async (reqid) => {
    await receiverAPI.cancelRequest(reqid);
    setPatientRequests(prev => prev.filter(r => (r.reqid !== reqid && r._id !== reqid)));
    notify('success', 'Request cancelled successfully.');
  };

  // Hospital requests blood from community donor
  const requestCommunityDonor = async (bdid, rid, bg) => {
    if (!currentUser || currentUser.role !== 'hospital') {
      notify('danger', 'Only hospitals can request community donors.');
      return false;
    }
    const currentId = currentUser._id || currentUser.id;

    const res = await hospitalAPI.requestDonor(currentId, rid, bg);
    if (res.data?.request) {
      setDonorRequests(prev => [res.data.request, ...prev]);
      notify('success', 'Inquiry sent to voluntary community donor!');
      return true;
    }

    const newReq = { donoid: Date.now(), hid: currentId, rid, bg, status: 'Pending' };
    setDonorRequests(prev => [newReq, ...prev]);
    notify('success', 'Inquiry sent to voluntary community donor!');
    return true;
  };

  const acceptDonorInquiry = async (donoid) => {
    await receiverAPI.acceptInquiry(donoid);
    setDonorRequests(prev => prev.map(r => (r.donoid === donoid || r._id === donoid) ? { ...r, status: 'Accepted' } : r));
    notify('success', 'You have agreed to donate blood for this request! Thank you.');
  };

  const rejectDonorInquiry = async (donoid) => {
    await receiverAPI.rejectInquiry(donoid);
    setDonorRequests(prev => prev.map(r => (r.donoid === donoid || r._id === donoid) ? { ...r, status: 'Rejected' } : r));
    notify('danger', 'Donation inquiry declined.');
  };

  const cancelDonorInquiry = async (donoid) => {
    await hospitalAPI.cancelDonorRequest(donoid);
    setDonorRequests(prev => prev.filter(r => (r.donoid !== donoid && r._id !== donoid)));
    notify('success', 'Donor inquiry cancelled.');
  };

  // Denormalized getters
  const getFullBloodStock = (filterBg = '') => {
    return bloodStock
      .filter(item => !filterBg || item.bg === filterBg)
      .map(item => {
        const hospital = hospitals.find(h => (h.id === item.hid || h._id === item.hid)) || {};
        return {
          ...item,
          hname: item.hname || hospital.hname || 'Partner Hospital',
          hcity: item.hcity || hospital.hcity || 'Unknown',
          hemail: item.hemail || hospital.hemail || '',
          hphone: item.hphone || hospital.hphone || '',
        };
      });
  };

  const getFullCommunityDonors = (filterBg = '') => {
    return communityDonors
      .filter(item => !filterBg || item.bg === filterBg)
      .map(item => {
        const receiver = receivers.find(r => (r.id === item.rid || r._id === item.rid)) || {};
        return {
          ...item,
          rname: item.rname || receiver.rname || 'Community Donor',
          rcity: item.rcity || receiver.rcity || 'Unknown',
          remail: item.remail || receiver.remail || '',
          rphone: item.rphone || receiver.rphone || '',
        };
      });
  };

  const getHospitalIncomingRequests = (hid) => {
    return patientRequests
      .filter(r => (r.hid === hid || r.hospital === hid || r.hospital?._id === hid))
      .map(r => {
        const receiver = receivers.find(rec => (rec.id === r.rid || rec._id === r.rid)) || {};
        return {
          ...r,
          rname: r.rname || receiver.rname || 'Patient',
          rcity: r.rcity || receiver.rcity || '',
          remail: r.remail || receiver.remail || '',
          rphone: r.rphone || receiver.rphone || '',
        };
      });
  };

  const getUserOutboundRequests = (rid) => {
    return patientRequests
      .filter(r => (r.rid === rid || r.receiver === rid || r.receiver?._id === rid))
      .map(r => {
        const hospital = hospitals.find(h => (h.id === r.hid || h._id === r.hid)) || {};
        return {
          ...r,
          hname: r.hname || hospital.hname || 'Hospital',
          hcity: r.hcity || hospital.hcity || '',
          hemail: r.hemail || hospital.hemail || '',
          hphone: r.hphone || hospital.hphone || '',
        };
      });
  };

  const getHospitalOutboundDonorRequests = (hid) => {
    return donorRequests
      .filter(r => (r.hid === hid || r.hospital === hid || r.hospital?._id === hid))
      .map(r => {
        const receiver = receivers.find(rec => (rec.id === r.rid || rec._id === r.rid)) || {};
        return {
          ...r,
          rname: r.rname || receiver.rname || 'Donor',
          rcity: r.rcity || receiver.rcity || '',
          remail: r.remail || receiver.remail || '',
          rphone: r.rphone || receiver.rphone || '',
        };
      });
  };

  const getUserIncomingDonationInquiries = (rid) => {
    return donorRequests
      .filter(r => (r.rid === rid || r.receiver === rid || r.receiver?._id === rid))
      .map(r => {
        const hospital = hospitals.find(h => (h.id === r.hid || h._id === r.hid)) || {};
        return {
          ...r,
          hname: r.hname || hospital.hname || 'Hospital',
          hcity: r.hcity || hospital.hcity || '',
          hemail: r.hemail || hospital.hemail || '',
          hphone: r.hphone || hospital.hphone || '',
        };
      });
  };

  return (
    <BloodBankContext.Provider
      value={{
        bloodStock,
        communityDonors,
        patientRequests,
        donorRequests,
        notification,
        notify,
        addHospitalBlood,
        deleteHospitalBlood,
        requestHospitalBlood,
        acceptPatientRequest,
        rejectPatientRequest,
        cancelPatientRequest,
        addDonorSample,
        deleteDonorSample,
        requestCommunityDonor,
        acceptDonorInquiry,
        rejectDonorInquiry,
        cancelDonorInquiry,
        getFullBloodStock,
        getFullCommunityDonors,
        getHospitalIncomingRequests,
        getUserOutboundRequests,
        getHospitalOutboundDonorRequests,
        getUserIncomingDonationInquiries,
      }}
    >
      {children}
    </BloodBankContext.Provider>
  );
}

export const useBloodBank = () => useContext(BloodBankContext);
