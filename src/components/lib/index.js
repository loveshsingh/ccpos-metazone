import typeof AppBar from "./AppBar";
import typeof AppButton from "./AppButton";
import typeof AppCard from "./AppCard";
import typeof AppCheckbox from "./AppCheckbox";
import typeof AppHelperText from "./AppHelperText";
import typeof AppIcon from "./AppIcon";
import typeof AppImage from "./AppImage";
import typeof AppImageBackground from "./AppImageBackground";
import typeof AppModal from "./AppModal";
import typeof AppPicker from "./AppPicker";
import typeof AppProgressDialog from "./AppProgressDialog";
import typeof AppSafeAreaView from "./AppSafeAreaView";
import typeof AppStatusBar from "./AppStatusBar";
import typeof AppText from "./AppText";
import typeof AppTextIconInput from "./AppTextIconInput";
import typeof AppToast from "./AppToast";
import typeof AppTouchableOpacity from "./AppTouchableOpacity";
import typeof AppTouchableWithoutFeedback from './AppTouchableWithoutFeedback'

module.exports = {
    // Components
    get AppBar(): AppBar {
        return require('./AppBar');
    },
    get AppButton(): AppButton {
        return require('./AppButton');
    },
    get AppCard(): AppCard {
        return require('./AppCard');
    },
    get AppCheckbox(): AppCheckbox {
        return require('./AppCheckbox');
    },
    get AppHelperText(): AppHelperText {
        return require('./AppHelperText');
    },
    get AppIcon(): AppIcon {
        return require('./AppIcon');
    },
    get AppImage(): AppImage {
        return require('./AppImage');
    },
    get AppImageBackground(): AppImageBackground {
        return require('./AppImageBackground');
    },
    get AppModal(): AppModal {
        return require('./AppModal');
    },
    get AppPicker(): AppPicker {
        return require('./AppPicker');
    },
    get AppProgressDialog(): AppProgressDialog {
        return require('./AppProgressDialog');
    },
    get AppSafeAreaView(): AppSafeAreaView {
        return require('./AppSafeAreaView');
    },
    get AppStatusBar(): AppStatusBar {
        return require('./AppStatusBar');
    },
    get AppText(): AppText {
        return require('./AppText');
    },
    get AppTextIconInput(): AppTextIconInput {
        return require('./AppTextIconInput');
    },
    get AppToast(): AppToast {
        return require('./AppToast');
    },
    get AppTouchableOpacity(): AppTouchableOpacity {
        return require('./AppTouchableOpacity');
    },
    get AppTouchableWithoutFeedback(): AppTouchableWithoutFeedback {
        return require('./AppTouchableWithoutFeedback');
    }
}