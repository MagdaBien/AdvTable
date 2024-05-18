import { IMGS_URL } from "../../../config";
import styles from "./PanelUserInfo.module.scss";

const PanelUserInfo = ({ adUser }) => {
  return (
    <div className="text-center">
      <img className={styles.photo} src={IMGS_URL + adUser.avatar} />
      <p className="text-muted">
        Added by: <br />
        {adUser.login} <br />
        tel. {adUser.tel}
      </p>
    </div>
  );
};

export default PanelUserInfo;
