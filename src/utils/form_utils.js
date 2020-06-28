import { reloadPageWithExtraParams } from './url_utils.js';

export function formToObj(formId){
    return $("#"+formId)
    .serializeArray()
    .reduce(function(result, item){
                result[item.name] = item.value;
                return result;
            }, {});
}

export function formJsonSubmissionHandler(formId, onSuccess){
    return function(event){
        event.preventDefault();
        $.ajax({
          type: 'POST',
          url: $("#"+formId).attr("action"),
          contentType: 'application/json',
          processData: false,
          data: JSON.stringify(formToObj(formId)), 
          success: onSuccess(response),
        });
    }
}

export function registerFormJsonSubmissionHandler(formId, onSuccess){
    $("#"+formId).submit(formJsonSubmissionHandler(formId, onSuccess));
}


export function reloadPageWithFormData(formId){
    reloadPageWithExtraParams({
        [formId]: JSON.stringify(formToObj(formId))
    });
}

export function registerPageReloadingFormHandler(formId){
    $("#"+formId).submit(function(event){
        event.preventDefault();
        reloadPageWithFormData(formId);
    });
}

