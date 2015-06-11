MessageBox = function (id) {
    this.container = null;
    this.titleContainer = null;
    this.title = null;
    this.iconTitle = null;
    this.body = null;
    this.footer = null;
    this.containerId = 'messagebox-container';
    this.modalHeader = null;
    if (id) {
        this.containerId = id;
    }

    this.info = function (titulo, body) {
        this.iconTitle.className = 'glyphicon glyphicon-info-sign';
        this.titleContainer.className = 'modal-title text-info ng-binding';
        this.title.innerHTML = titulo;
        this.title.className = 'modal-title text-info ng-binding';
        this.body.innerHTML = body;
        this.modalHeader.className = 'modal-header dialog-header-notify';
        this.footer.innerHTML = '<button type="button" class="btn btn-primary btn-lg" data-dismiss="modal">Ok</button>';
        $('#' + this.containerId).modal('show');
    };
    
    this.error = function (titulo, body) {
        this.iconTitle.className = 'glyphicon glyphicon-remove';
        this.titleContainer.className = 'modal-title  ng-binding';
        this.title.innerHTML = titulo;
        this.title.className = 'modal-title ng-binding';
        this.body.innerHTML = body;
        this.modalHeader.className = 'modal-header  dialog-header-error';
        this.footer.innerHTML = '<button type="button" class="btn btn-danger btn-lg" data-dismiss="modal">Ok</button>';
        $('#' + this.containerId).modal('show');
    };
    
    this.confirm = function(titulo,body, fnYes, fnNo){
        var myModal = $('#'+this.containerId);
        this.iconTitle.className = 'glyphicon glyphicon-check';
        this.titleContainer.className = 'modal-title ng-binding';
        this.title.innerHTML = titulo;
        this.title.className = '';
        this.body.innerHTML = body;
        this.modalHeader.className = 'modal-header dialog-header-confirm';
        this.footer.innerHTML = '';
        
        var btnYes = document.createElement('button');
        btnYes.className = 'btn btn-success btn-lg';  
        btnYes.innerHTML = 'Sim';
        btnYes.addEventListener('click', function(){
            fnYes();
            myModal.modal('hide');
        }
        );
        this.footer.appendChild(btnYes);
        
        var btnNo = document.createElement('button');
        btnNo.className = 'btn btn-danger btn-lg';
        btnNo.innerHTML = 'Não';
        if ( fnNo ){
            btnNo.addEventListener('click', function(){ 
                btnNo();
                myModal.modal('hide');
            });
        }
        else{
            btnNo.setAttribute('data-dismiss','modal');
        }
        this.footer.appendChild(btnNo);
        myModal.modal('show');
    };



    this.init = function () {
        if (!document.getElementById(this.containerId)) {
            var div = document.createElement('div');
            div.id = this.containerId;
            document.body.appendChild(div);
        }
        this.container = document.getElementById(this.containerId);
        this.container.innerHTML = '';

        var div = this.container;
        div.className = 'modal fade ';
        div.setAttribute('tabindex', -1);
        div.setAttribute('role', 'dialog');
        div.setAttribute('role', 'dialog');
        div.setAttribute('aria-hidden', 'true');
        div.setAttribute('aria-labelledby', this.containerId + '-label');

        var divModalDialog = document.createElement('div');
        divModalDialog.className = 'modal-dialog';
        div.appendChild(divModalDialog);

        var divModalContent = document.createElement('div');
        divModalContent.className = 'modal-content';
        divModalDialog.appendChild(divModalContent);

        var divModalHeader = document.createElement('div');
        divModalHeader.className = 'modal-header';
        divModalContent.appendChild(divModalHeader);
        
        this.modalHeader = divModalHeader;

        var buttonHeader = document.createElement('button');
        buttonHeader.className = 'close';
        buttonHeader.setAttribute('type', 'button');
        buttonHeader.setAttribute('data-dismiss', 'modal');
        buttonHeader.setAttribute('aria-labl', 'Close');
        divModalHeader.appendChild(buttonHeader);

        var spanButtonHeader = document.createElement('span');
        spanButtonHeader.setAttribute('aira-hidden', 'true');
        spanButtonHeader.innerHTML = '&times;';
        buttonHeader.appendChild(spanButtonHeader);

        var h4ButtonHeader = document.createElement('h4');
        h4ButtonHeader.className = 'modal-title';
        h4ButtonHeader.id = this.containerId + '-label';
        divModalHeader.appendChild(h4ButtonHeader);
        
        var spanIcon = document.createElement('span');
        h4ButtonHeader.appendChild(spanIcon);
        this.iconTitle = spanIcon;
        
        var spanTitle = document.createElement('span');
        h4ButtonHeader.appendChild(spanTitle);
        
        this.titleContainer = h4ButtonHeader;       
        
        this.title = spanTitle;

        var modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        divModalContent.appendChild(modalBody);

        this.body = modalBody;

        var modalFooter = document.createElement('div');
        modalFooter.className = 'modal-footer';
        divModalContent.appendChild(modalFooter);

        this.footer = modalFooter;
        
        var style = document.createElement('style');
        document.head.appendChild(style);
        style.sheet.insertRule('.dialog-header-notify { background-color: #eeeeee; }',0);
        style.sheet.insertRule('.dialog-header-error { background-color: #d2322d; color: #fff; }',1);
        style.sheet.insertRule('.dialog-header-wait { background-color: #428bca; }',2);
        style.sheet.insertRule('.dialog-header-confirm { background-color: #333333; color: #fff; }',3);
        
    };
};

/*messageBox = new MessageBox(null);
messageBox.init();*/