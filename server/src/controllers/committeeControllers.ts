import { Request, Response, NextFunction } from "express";
import {
  addPubsRequest,
  addSocialHandle,
} from "../interfaces/committeeInterfaces";
import {
  getCommitteeId,
  checkUniquePubs,
  addPubsToCommittee,
  insertSocialHandle,
  getCommittees,
  getCommitteeInfo,
  updateCommitteeInfoService,
  getPubsInfo,
  getCommitteeMembers,
  getSocialHandlesService,
} from "../services/committeeServices";
import { getRoleIdMember, getRoleIdHead } from "../services/roleService";

export async function addPubs(
  req: Request<{}, {}, addPubsRequest>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { details, jwtPayload, role } = req.body;

    const cId = await getCommitteeId(role);

    const uniquePubs = await checkUniquePubs(details.contact, Number(cId));

    if (uniquePubs) {
      res
        .status(409)
        .json({ message: "Pubs with this contact number already exists!" });
      return;
    }

    const addedPubs = await addPubsToCommittee(details, Number(cId));

    if (addedPubs) {
      res.status(200).json({ message: "Pubs added successfully!" });
    }

    res.json({ message: "adding pubs" });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function addSocialHandle(
  req: Request<{}, {}, addSocialHandle>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { details, jwtPayload, role } = req.body;

    const cId = await getCommitteeId(role);

    const newSocialHandle = await insertSocialHandle(details, Number(cId));

    if (newSocialHandle) {
      res.status(200).json({ message: "Social handle added successfully!" });
    }
  } catch (error) {
    console.error("Error adding social handle:", error);
    next(error);
  }
}

export async function getAllCommittees(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const committees = await getCommittees();

    if (committees) {
      res.status(200).json({ message: "All committees", committees });
      return;
    }
    res.status(200).json({ message: "No committees found" });
  } catch (error) {
    console.error("Error fetching all committees:", error);
    next(error);
  }
}

export async function committeeInfo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { role } = req.body;
    const nickName = role.split("_")[0];
    const info = await getCommitteeInfo(nickName);
    if (info) {
      res.status(200).json({ message: "Committee Info", info });
      return;
    }
  } catch (error) {
    console.error("Error geting committee info: ", error);
    next(error);
  }
}

export async function updateCommitteeInfo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { role, info } = req.body;
    const nickName = role.split("_")[0];
    const cId = await getCommitteeId(nickName);
    if (!cId) {
      res.status(404).json("Committee Not found!");
    }
    const update = await updateCommitteeInfoService(Number(cId), info);
    if (update) {
      res.status(200).json({ message: "Committe info updated successfully!" });
    }
  } catch (error) {
    console.error("Error geting committee info: ", error);
    next(error);
  }
}

export async function committeePubs(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { role } = req.body;
    const nickName = role.split("_")[0];
    const cId = await getCommitteeId(nickName);
    if (!cId) {
      res.status(404).json("Committee Not found!");
    }
    const pubs = await getPubsInfo(Number(cId));
    if (pubs) {
      res.status(200).json({ message: "Pubs info fetched!", pubs });
    }
  } catch (error) {
    console.error("Error geting committee info: ", error);
    next(error);
  }
}

export async function committeeMembers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { role } = req.body;
    const nickName = role.split("_")[0];
    const roleMId = await getRoleIdMember(nickName);
    const roleHId = await getRoleIdHead(nickName);
    const members = await getCommitteeMembers(Number(roleMId?.id));
    const heads = await getCommitteeMembers(Number(roleHId?.id));
    if (heads) {
      res
        .status(200)
        .json({ message: "Members fetched!", members: [heads, members] });
    }
  } catch (error) {
    console.error("Error geting committee info: ", error);
    next(error);
  }
}

export async function getSocialHandles(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { jwtPayload, role } = req.body;
    const nickName = role.split("_")[0];
    const cId = await getCommitteeId(nickName);

    if (!cId) {
      res.status(404).json("Committee Not found!");
      return;
    }
    const socialHandles = await getSocialHandlesService(Number(cId));

    if (!socialHandles) {
      res
        .status(200)
        .json({ message: "No social handles found!", socialHandles: [] });
      return;
    }

    res.status(200).json({ message: "Social handles fetched!", socialHandles });
  } catch (error) {
    next(error);
  }
}

export async function getSocialHandlesUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { committeeId } = req.query; // Get the query parameter

    // Use committeeId from query if present, otherwise derive from role
    const cId = committeeId;

    if (!cId) {
      res.status(404).json("Committee Not found!");
      return;
    }

    const socialHandles = await getSocialHandlesService(Number(cId));

    if (!socialHandles) {
      res
        .status(200)
        .json({ message: "No social handles found!", socialHandles: [] });
      return;
    }

    res.status(200).json({ message: "Social handles fetched!", socialHandles });
  } catch (error) {
    next(error);
  }
}
