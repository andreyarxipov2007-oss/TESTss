$(document).ready(function(){
    $('#ResponseModal').on('show.bs.modal', function (e) {  
        var vacancy_id = $(e.relatedTarget).data('vacancy-id');
        $(this).find('#vacancy_id').val(vacancy_id);  
    });

    $('#ContactModal').on('show.bs.modal', function (e) {  
        var surname = $(e.relatedTarget).data('surname');
        var name = $(e.relatedTarget).data('name');
        var patronymic = $(e.relatedTarget).data('patronymic');
        var fio = surname + ' ' + name + ' ' + patronymic;
        $(this).find('#fio').html(fio);
        
        var phone = $(e.relatedTarget).data('phone');
        $(this).find('#phone').html('Номер телефона: ' + phone);

        var email = $(e.relatedTarget).data('email');
        $(this).find('#email').html('Электронная почта: ' + email);
    });

    $('#VacancyModal').on('show.bs.modal', function (e) {  
        var position = $(e.relatedTarget).data('position');
        $(this).find('#position').html(position);

        var email = $(e.relatedTarget).data('email');
        $(this).find('#email').html(email);

        var phone = $(e.relatedTarget).data('phone');
        $(this).find('#phone').html(phone);

        var salary = $(e.relatedTarget).data('salary').toLocaleString('de-DE');
        $(this).find('#salary').html(salary);
        
        var city = $(e.relatedTarget).data('city');
        $(this).find('#city').html(city);
        
        var company = $(e.relatedTarget).data('company');
        $(this).find('#company').html(company);
        
        var experience = $(e.relatedTarget).data('experience');
        $(this).find('#experience').html(experience);
        
        var description = $(e.relatedTarget).data('description');
        $(this).find('#description').html(description);
        
        var created_at = $(e.relatedTarget).data('created-at');
        $(this).find('#created_at').html(created_at);
    });

    $('#ResumeModal').on('show.bs.modal', function (e) {  
        var position = $(e.relatedTarget).data('position');
        $(this).find('#position').html(position);
        
        var phone = $(e.relatedTarget).data('phone');
        $(this).find('#phone').html(phone);
        
        var email = $(e.relatedTarget).data('email');
        $(this).find('#email').html(email);
        
        var salary = $(e.relatedTarget).data('salary').toLocaleString('de-DE');
        $(this).find('#salary').html(salary);
        
        var education = $(e.relatedTarget).data('education');
        $(this).find('#education').html(education);
        
        if($(e.relatedTarget).data('education-place')){
            var education_place = $(e.relatedTarget).data('education-place');
            $(this).find('#education_place').html(education_place);
        } else{
            $(this).find('#education_place').parent('h4').remove();
        }
        
        var experience = $(e.relatedTarget).data('experience');
        $(this).find('#experience').html(experience);
        
        if($(e.relatedTarget).data('experience-place')){
            var experience_place = $(e.relatedTarget).data('experience_place');
            $(this).find('#experience_place').html(experience_place);
        } else{
            $(this).find('#experience_place').parent('h4').remove();
        }
        
        var description = $(e.relatedTarget).data('description');
        $(this).find('#description').html(description);
        
        var created_at = $(e.relatedTarget).data('created-at');
        $(this).find('#created_at').html(created_at);
    });  
});
