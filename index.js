const akPush = new AKPush();

const $subscribeBtn = document.querySelector('#subscribe-btn');
const $updatedBtn = document.querySelector('#update-btn')
const $statusIndicator = document.querySelector('#status-indicator');

const PushState = {
    status: null
}

const PushStatusType = {
    ok: 'ok',
    fail: 'fail',
}

const StatusIndicatorClasses = {
    active: 'active',
    inactive: 'inactive',
}

async function onSubscribe() {
    try {
        await akPush.initSubscription(
            {
                email: 'example@email.com'
            }
        );
    } catch (error) {
        console.log(error);
    }

    onUpdate();
}

async function onUpdate() {
    try {
        const response = await akPush.updateSubscription();
        
        PushState.status = response.status;
    } catch (error) {
        console.log(error);
    }

    renderStatusIndicator();
}

function renderStatusIndicator() {
    if (PushState.status === PushStatusType.ok) {
        $statusIndicator?.classList.remove(StatusIndicatorClasses.inactive);
        $statusIndicator?.classList.add(StatusIndicatorClasses.active);
    } else {
        $statusIndicator?.classList.remove(StatusIndicatorClasses.active);
        $statusIndicator?.classList.add(StatusIndicatorClasses.inactive);
    }
}

onUpdate();

$updatedBtn?.addEventListener('click', onUpdate);
$subscribeBtn?.addEventListener('click', onSubscribe)
