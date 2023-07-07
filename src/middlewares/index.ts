import { validateId } from "./validadeId.middlewares";
import { validateName } from "./validateName.middleware";
import { handleError } from "./handleErrors.middlewares";

export default{
    handleError,
    validateId,
    validateName
}