import { serverEndpoint } from "./axios";

// let backendAdr = "http://localhost:3333";
export const endpoints = {
  base_url: "http://him.sbmu.ac.ir:8000", // for publish
  login_endpoint: "/auth/signin",
  refresh_endpoint: "/auth/refresh",
  logout: "/auth/logout",

  signup: "/auth/signup",
  getSexList: "/auth/getSexList",
  // app-cores
  app_core_get_pages_minimal: "/app-core/getPagesMinimal",
  app_core_has_route_minimal: (RouteId) => `/app-core/userHasRouteId?RouteId=${RouteId}`,

  // new endpoinst
  user_get_users: "/user/getUsers",
  user_get_users_WASG: "/user/getUsersWASG",
  user_get_user_me: "/user/me",
  user_update_user_profile: "/user/updateProfile",
  user_update_user_profile_super_user: "/user/updateProfileSu",
  user_get_sex_list: "/user/getSexList",
  user_get_user_type_list: "/user/getUserTypeList",
  user_change_password: "/user/ChangePass", // OldPassword , NewPassword ,

  security_get_security_groupes: "/security/getSecurityGroupes",
  security_get_security_types: "/security/getSecurityTypes",
  security_get_security_groupes_access: "/security/getSecurityGroupsAccess", // SecurityGroupId:number
  security_toggle_security_groupes_access: "/security/toggleSecurityGroupsAccess", // SecurityGroupId:number
  security_get_security_groupes_users: "/security/getSecurityGroupsUsers", // SecurityGroupId:number
  security_delete_user_from_security_group: "/security/deleteUserFromSecurityGroup", // SecurityGroupId:number , UserId:number
  security_get_users_security_group: "/security/getUsersSecurityGroup", //  UserId:number
  security_toggle_user_security_group: "/security/toggleUsersSecurityGroup", // SecurityGroupId:number , UserId:number
  security_delete_all_users_security_groupes: "/security/deleteAllUsersSecurityGroupes", // UserId:number ** Dangerous **
  security_add_bulk_users_security_groupes: "/security/addBulkUsersSecurityGroup", // UserIds:number[] , SecurityGroupId:number
  // fff

  // upload
  upload_chunk: "/upload/chunk/", // +{uuid} => ChunkNumber, TotalChunks, Originalname, SaveOnServer, FileTypeId, RelationId

  // files
  file_get_file_list: (FileTypeId, RelatedId) => `/file/getFileList/${FileTypeId}/${RelatedId}`,

  file_get_file_by_uuid: (uuid, isThumb = false, isPrivate = false, thumbnailWidth, thumbnailHeight) =>
    `/file/general/${uuid}?p=${isPrivate ? "true" : "false"}&thumbnail=${isThumb ? "true" : "false"}${
      thumbnailWidth ? `&thumbnailWidth=${thumbnailWidth}` : ""
    }${thumbnailHeight ? `&thumbnailHeight=${thumbnailHeight}` : ""}`,
  file_url_file_by_uuid: (uuid, isThumb = false, isPrivate = false, thumbnailWidth, thumbnailHeight) =>
    `${serverEndpoint}${endpoints.file_get_file_by_uuid(uuid, isThumb, isPrivate, thumbnailWidth, thumbnailHeight)}`,

  file_url_users_avatar: (userId) => `${serverEndpoint}/file/getUsersAvatar/${userId}`,

  file_is_file_type_private: (FileTypeId) => `/file/isFileTypePrivate/${FileTypeId}`,
  file_is_file_type_solo: (FileTypeId) => `/file/isFileTypeSolo/${FileTypeId}`,
  file_delete_general: (uuid, isPrivate = false) => `/file/deleteGeneralFile/${uuid}?p=${isPrivate ? "true" : "false"}`,

  // projects
  projects_get_project_types: "/projects/ProjectTypes",
  projects_get_project_types_minimal: "/projects/ProjectTypesMinimal",
  projects_get_project_list: "/projects/GetProjectList",
  projects_upsert_project_status: "/projects/upsertProjectStatus",
  projects_upsert_project: "/projects/upsertProject",
  //   ProjectTypeId
  // ClientId
  // ClientDepartmentId
  // ProjectId
  projects_get_project_list_minimal: (ProjectTypeId, ClientId, ClientDepartmentId, ProjectId) =>
    `/projects/GetProjectListMinimal?1=1${ProjectTypeId ? `&ProjectTypeId=${ProjectTypeId}` : ""}${
      ClientId ? `&ClientId=${ClientId}` : ""
    }${ClientDepartmentId ? `&ClientDepartmentId=${ClientDepartmentId}` : ""}${
      ProjectId ? `&ProjectId=${ProjectId}` : ""
    }`,
  projects_get_project_by_id: (id) => `/projects/GetProjectById/${id}`,
  projects_delete_project: (id) => `/projects/DeleteProject/${id}`,

  // clients

  clients_GetClients: "/clients/GetClients",
  clients_upsertClient: "/clients/upsertClient",
  clients_clientsDepartments: "/clients/clientsDepartments",
  // clients_getClientsAgents: "/clients/getClientsAgents",
  // dtickets_getTicketList: "/dtickets/getTicketList",

  dtickets_getTicketList: (TicketId) => `/dtickets/getTicketList?1=1${TicketId ? `&TicketId=${TicketId}` : ""}`,

  clients_upsertClientsDepartment: "/clients/upsertClientsDepartment",

  clients_upsertClientsAgents: "/clients/upsertClientsAgents",
  dtickets_getTicketStatus: "/dtickets/getTicketStatus",
  dtickets_getTicketTypes: "/dtickets/getTicketTypes",
  // dtickets_getTicketDetail: "/dtickets/getTicketDetail",

  dtickets_getTicketDetail: (TicketId) => `/dtickets/getTicketDetail?TicketId=${TicketId}`,
  dtickets_getTicketProjectList: "/dtickets/getTicketProjectList",
  dtickets_saveTicket: "/dtickets/saveTicket",
  dtickets_getUserFromTicketing: "/dtickets/getUserFromTicketing",
  dtickets_getUsers: "/dtickets/getUsers",
  dtickets_getUsersTicketingCount: "/dtickets/getUsersTicketCount",
  dtickets_getSecurityGroupes: "/dtickets/getSecurityGroupes",

  dtickets_getUsersTypes: "/dtickets/getUsersTypes",
  dtickets_upsertUsers: "/dtickets/upsertTicketingUser",
  dtickets_getSexList: "/dtickets/getSexList",
  dtickets_getNewTicketsOfUser: "/dtickets/getNewTicketsOfUser",
  projects_getProjectStatusTypes: "/projects/getProjectStatusTypes",
  projects_getProjectStatusRecords: (ProjectId) => `/projects/getProjectStatusRecords?ProjectId=${ProjectId}`,
  projects_upsertDefineProjectStatus: "/projects/upsertDefineProjectStatus",

  clients_getDepartmentsAssignedAgents: (ClientId, ClientDepartmentId) =>
    `/clients/getDepartmentsAssignedAgents?ClientId=${ClientId}&ClientDepartmentId=${ClientDepartmentId}`,

  clients_departmentsAgentChangeActive: "/clients/departmentsAgentChangeActive",

  user_Register: "/user/register",
  clients_assignAgentToDepartment: "/clients/assignAgentToDepartment",

  clients_getClientsAgents: (ClientId) => `/clients/getClientsAgents?ClientId=${ClientId}`,
  projects_getProjectPhaseRecords: (ProjectId) => `/projects/getProjectPhaseRecords?ProjectId=${ProjectId}`,
  projects_upsertProjectPhaseRecords: "/projects/upsertProjectPhaseRecords",
  projects_getProjectsConnectionInfo: (ProjectId) => `/projects/getProjectsConnectionInfo?ProjectId=${ProjectId}`,
  projects_upsertProjectConnection: "/projects/upsertProjectConnection",

  leave_getUsersLeaves: "/leave/getUsersLeaves",
  leave_insertLeave: "/leave/insertLeave",
  leave_getLeaveList: "/leave/getLeaveList",

  leave_acceptOrRejectLeaveReq: "/leave/acceptOrRejectLeaveReq",
  leave_getLeaveTypes: "/leave/getLeaveTypes",
};
