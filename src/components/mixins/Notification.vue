<script>
import { Notify } from 'quasar';

export function NotifyResponseSuccess(caption) {
  Notify.create({
    icon: 'img:/images/icons/notify-success.svg',
    classes: 'notification-success',
    message: caption,
    position: 'center',
    timeout: 100,
  });
}

export function NotifyResponseWarning(caption) {
  Notify.create({
    icon: 'img:/images/icons/notify-warning.svg',
    caption,
    classes: 'notification-warning',
    position: 'center',
    timeout: 100,
  });
}

export function NotifyResponseErrorForRegister(caption) {
  Notify.create({
    caption,
    classes: 'notification-error',
    position: 'center',
    timeout: 100,
  });
}

export function NotifyResponseError(response, attr) {
  let caption = 'Internal server error.';
  if (response.status !== 500) {
    caption = getErrorResponseMessage(response.data[attr]);
  }

  Notify.create({
    icon: 'img:/images/icons/notify-error.svg',
    caption,
    classes: 'notification-error',
    message: 'Error',
    position: 'center',
    timeout: 100,
  });
}

export function NotifyResponseErrorWithCaption(caption) {
  Notify.create({
    icon: 'img:/images/icons/notify-error.svg',
    caption,
    classes: 'notification-error',
    message: 'Error',
    position: 'center',
    timeout: 100,
  });
}

function getErrorResponseMessage(data) {
  if (Array.isArray(data)) return data.join(', ');
  return data;
}
</script>
