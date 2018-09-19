import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import { clearTimeout } from 'timers';
import '../../compiled/containers/PosterView/PosterView.css';
import { getPosters } from '../../redux/actions/posters';
import Poster from '../../components/Poster';

class PosterView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: '',
        };
    }

    onSearchChange = event => {
        const { value } = event.target;

        this.setState({
            keyword: value,
        });

        if (value.length > 2) {
            if (this.timeOut) {
                try {
                    clearTimeout(this.timeOut);
                } catch (err) {
                }
            }
            this.timeOut = setTimeout(() => {
                this.props.getPosters(this.state.keyword);
            }, 300)
        }
    }

    render() {
        const { keyword } = this.state;
        const { posters } = this.props;

        return (
            <div className='poster-view'>
                <span>Search: </span>
                <input className='search-input' type='text' value={keyword} onChange={this.onSearchChange} />
                <div className='posters'>
                    {posters.map(poster => <Poster title={poster.Title} url={poster.Poster} />)}
                </div>
            </div>
        );
    }
}

PosterView.propTypes = {
    posters: PropTypes.arrayOf(PropTypes.object).isRequired,
    getPosters: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
    posters: store.posters.posters,
});

const mapActionToProps = {
    getPosters,
};

export default connect(mapStateToProps, mapActionToProps)(PosterView);