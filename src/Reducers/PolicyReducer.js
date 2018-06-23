import { isNumber } from 'util';

import PolicyConstants from '../Constants/PolicyConstants';

function filterById(id, delId) {
  if (isNumber(id) && id !== 0 && id !== delId) {
    return true;
  }
  return false;
}

function PolicyReducer(state = {}, action) {
  switch (action.type) {
    case PolicyConstants.CREATE_REQUEST:
      return {
        policies: action.policyName,
      };
    case PolicyConstants.CREATE_SUCCESS:
      return {
        policies: action.policyName,
      };
    case PolicyConstants.CREATE_FAILURE:
      return {};
    case PolicyConstants.UPLOAD_MATERIAL_REQUEST:
      return {};
    case PolicyConstants.UPLOAD_MATERIAL_SUCCESS:
      return {};
    case PolicyConstants.UPLOAD_MATERIAL_FAILURE:
      return {};
    case PolicyConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case PolicyConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        policies: action.policies,
      });
    case PolicyConstants.GETALL_FAILURE:
      return {
        policies: {},
      };
    case PolicyConstants.GETOUTSTANDINGPOLICIESFORUSER_REQUEST:
      return {
        loading: true,
      };
    case PolicyConstants.GETOUTSTANDINGPOLICIESFORUSER_SUCCESS:
      return Object.assign({}, state, {
        policies: action.policies,
      });
    case PolicyConstants.GETOUTSTANDINGPOLICIESFORUSER_FAILURE:
      return {
        policies: {},
      };
    case PolicyConstants.ACKNOWLEDGE_REQUEST:
      return {
        loading: true,
      };
    case PolicyConstants.ACKNOWLEDGE_SUCCESS:
      return {
        policy: action.policyName,
      };
    case PolicyConstants.ACKNOWLEDGE_FAILURE:
      return {};
    case PolicyConstants.CLEAR_POLICIES:
      return {
        policies: undefined,
      };
    case PolicyConstants.LOAD_POLICY_REQUEST:
      return {
        loading: true,
      };
    case PolicyConstants.LOAD_POLICY_SUCCESS:
      return Object.assign({}, state, {
        policy: action.policy,
        loading: false,
      });
    case PolicyConstants.DELETEPOLICY_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case PolicyConstants.DELETEPOLICY_SUCCESS:
      return Object.assign({}, state, {
        policy: state.policy.filter(obj => filterById(obj.id, action.id)),
        loading: false,
      });
    case PolicyConstants.DELETEPOLICY_FAILURE:
      return state;
    case PolicyConstants.GET_MATERIAL_REQUEST:
      return Object.assign({}, state, {
        loadingMaterial: true,
      });
    case PolicyConstants.GET_MATERIAL_SUCCESS:
      return Object.assign({}, state, {
        loadingMaterial: false,
        policyMaterial: action.material,
      });
    case PolicyConstants.GET_MATERIAL_FAILURE:
      return Object.assign({}, state, { policyMaterial: [] });
    default:
      return state;
  }
}

export default PolicyReducer;
